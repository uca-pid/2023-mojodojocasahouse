import 'react-native-gesture-handler';
import React from 'react';
import { Alert } from 'react-native';
import { AuthContext } from './context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TableScreen from './screens/TableScreen';
import ChangePassScreen from './screens/ChangePassScreen';
import ForgottenPasswordScreen from './screens/ForgottenPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import PieScreen from './screens/PieScreen';
import BarScreen from './screens/BarScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { doLogout, doSignIn, verifyCredentials } from './utils/apiFetch';
import SplashScreen from './screens/SplashScreen';
import CustomDrawer from './components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import BudgetsScreen from './screens/BudgetsScreen';
import BudgetStack from './navigation/BudgetStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExpenseStack from './navigation/ExpenseStack';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


const config = {
  screens: {
    "reset-password": "reset-password/:token"
  }
};

const linking = {
  prefixes: [
    "extra://"
  ],
  config: config
}; 

const App = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            isLoading: false,
            hasCredentials: action.hasCredentials,
            userCredentials: action.userCredentials,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            hasCredentials: action.hasCredentials,
            userCredentials: action.userCredentials,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            hasCredentials: false,
            userCredentials: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      hasCredentials: false,
      userCredentials: null
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let responseStatus;

      responseStatus = await verifyCredentials();
        
      switch(responseStatus) {
        case("2xx"):
          const credentials = await AsyncStorage.getItem('userCredentials');
          dispatch({ type: 'RESTORE_TOKEN', hasCredentials: true, userCredentials: credentials });
          break;
        case("4xx"):
          await AsyncStorage.removeItem("userCredentials");
          dispatch({ type: 'RESTORE_TOKEN', hasCredentials: false, userCredentials: null });
          break;
        case("5xx"):
          Alert.alert("Oops!", "An error ocurred, try again later.", [
            {text: "Try Again", onPress: bootstrapAsync}
          ]);
          break;
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (request) => {
        let {status, credentials} = await doSignIn(request);

        switch(status){
          case("2xx"):
            await AsyncStorage.setItem("userCredentials", JSON.stringify(credentials));
            dispatch({ type: 'SIGN_IN', hasCredentials: true, userCredentials: credentials });
            break;
          case("4xx"):
            Alert.alert("Invalid credentials", "Check fields and try again.");
            break;
          case("5xx"):
            Alert.alert("Oops!", "An error ocurred, try again later.");
            break;
        }
      },
      signOut: async () => {
        // First we call API to indicate that we are signing out,
        // this way we can invalidate credentials from backend
        let apiStatusResponse = await doLogout();

        switch(apiStatusResponse){
          case("2xx"):
            await AsyncStorage.removeItem("userCredentials");
            dispatch({ type: 'SIGN_OUT' });
            break;
          case("4xx"):
            await AsyncStorage.removeItem("userCredentials");
            dispatch({ type: 'SIGN_OUT' });
            break;
          case("5xx"):
            Alert.alert("Oops!", "An error ocurred, try again later.");
            break;
        }
      },
      sessionExpired: async () => {
        await AsyncStorage.removeItem("userCredentials");
        dispatch({ type: "SIGN_OUT" });
      }
    }),
    []
  );

  const DrawerNavigation = (props) => {
    return (
      <Drawer.Navigator 
      drawerContent={props => (
        <CustomDrawer {...props} 
        username={state.userCredentials? state.userCredentials.firstName + " " + state.userCredentials.lastName : "Anonymous"} />)}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#E86DC3',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }} 
      backBehavior='history'>
      {state.isLoading ? (
            // We haven't finished checking for the token yet
            <>
              <Drawer.Screen 
                name="Splash" 
                component={SplashScreen} 
              />
            </>
          ) : !state.hasCredentials ? (
          <>
            <Drawer.Screen
              name="Login" 
              component={LoginScreen} 
              options={{
                title: "Log in",
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                drawerIcon: ({color}) => (
                  <Ionicons name="log-in-outline" size={22} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="SignUp" 
              component={RegisterScreen} 
              options={{
                title: "Sign up",
                drawerIcon: ({color}) => (
                  <Ionicons name="create-outline" size={22} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="forgotten-password"
              component={ForgottenPasswordScreen}
              options={{
                title: "Forgot your password?",
                drawerIcon: ({color}) => (
                  <Ionicons name="help-outline" size={22} color={color} />
                ),
              }}
            />
          </>
        ) : (
          <>
            <Drawer.Screen
              name="Table"
              component={TableScreen} 
              options={{
                title: "My expenses",
                drawerIcon: ({color}) => (
                  <Ionicons name="home-outline" size={22} color={color} />
                ),
              }}
            />
            <Drawer.Screen 
              name="Budgets"
              component={BudgetStack}
              options={{
                title: "Budgets",
                drawerIcon: ({color}) => (
                  <Ionicons name="cash-outline" size={22} color={color} />
                ),
              }}
            />
            <Drawer.Screen 
              name='Add Expense'
              component={ExpenseStack}
              options={{
                title: "Add Expense",
                drawerIcon: ({color}) => (
                  <Ionicons name="add" size={22} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="GraphScreen"
              component={PieScreen} // Use a separate component for the screen
              options={{
              title: "Pie-Chart",
              drawerIcon: ({color}) => (
                  <Ionicons name="bowling-ball-outline" size={22} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="BarScreen"
              component={BarScreen} // Use a separate component for the screen
              options={{
              title: "Bar-Chart",
              drawerIcon: ({color}) => (
                  <Ionicons name="analytics-outline" size={22} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="ChangePassScreen"
              component={ChangePassScreen} // Use a separate component for the screen
              options={{
                title: "Change password",
                drawerIcon: ({color}) => (
                  <Ionicons name="lock-closed-outline" size={22} color={color} />
                ),
              }}
            />
          </>
        )}
      </Drawer.Navigator>
    );
  };

  return (
    <AuthContext.Provider value={authContext}>
    <SafeAreaProvider>
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen 
          name="drawer"
          component={DrawerNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="reset-password"
          component={ResetPasswordScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
    </AuthContext.Provider>
  );
};

export default App;
