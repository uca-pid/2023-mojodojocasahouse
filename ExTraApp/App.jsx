import 'react-native-gesture-handler';
import React from 'react';
import { AuthContext } from './context/authContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './screens/loginScreen/login';
import Table from './screens/tableScreen/table';
import SignUp from './screens/signUpScreen/signUp';
import ChangePassScreen from './screens/changePassScreen/changePassScreen';
import ForgottenPassword from './screens/forgottenPasswordScreen/forgottenPassword';
import ResetPassword from './screens/resetPasswordScreen/resetPassword';
import AdmCategories from './screens/admCategoriesScreen/admCategories';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doLogout, doSignIn, verifyCredentials } from './utils/apiFetch';
import SplashScreen from './screens/splashScreen/splashScreen';
import CustomDrawer from './components/customDrawer/customDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
            hasCredentials: action.hasCredentials,
            isLoading: false,
            userCredentials: null,
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
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let responseStatus;

      responseStatus = await verifyCredentials();
        
      switch(responseStatus) {
        case("2xx"):
          dispatch({ type: 'RESTORE_TOKEN', hasCredentials: true });
          break;
        case("4xx"):
          // await AsyncStorage.removeItem("rememberMeCookie");
          dispatch({ type: 'RESTORE_TOKEN', hasCredentials: false });
          break;
        case("5xx"):
          Alert.alert("Oops!", "An error ocurred, try again later.");
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
            // await AsyncStorage.setItem("rememberMeCookie", cookieResponse);
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
            // await AsyncStorage.removeItem("rememberMeCookie");
            dispatch({ type: 'SIGN_OUT' });
            break;
          case("4xx"):
            // await AsyncStorage.removeItem("rememberMeCookie");
            dispatch({ type: 'SIGN_OUT' });
            break;
          case("5xx"):
            Alert.alert("Oops!", "An error ocurred, try again later.");
            break;
        }
      },
      sessionExpired: async () => {
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
        drawerActiveBackgroundColor: '#aa18ea',
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
              name="Login" // Define a new screen called "Login"
              component={Login} // Use the Login component
              options={{
                title: "Log in",
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                drawerIcon: ({color}) => (
                  <Ionicons name="log-in-outline" size={22} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="SignUp" // Define a new screen called "SignUp"
              component={SignUp} // Use the SignUp component
              options={{
                title: "Sign up",
                drawerIcon: ({color}) => (
                  <Ionicons name="create-outline" size={22} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="forgotten-password"
              component={ForgottenPassword}
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
              component={Table} // Use a separate component for the screen
              options={{
                title: "My expenses",
                drawerIcon: ({color}) => (
                  <Ionicons name="home-outline" size={22} color={color} />
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
          component={ResetPassword}
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
