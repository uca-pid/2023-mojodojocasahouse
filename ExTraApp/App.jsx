import 'react-native-gesture-handler';
import React, { createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/loginScreen/login';
import Table from './screens/tableScreen/table';
import SignUp from './screens/signUpScreen/signUp';
import ChangePassScreen from './screens/changePassScreen/changePassScreen';
import AdmCategories from './screens/admCategoriesScreen/admCategories';
import SessionContext from './context/SessionContext';


const Stack = createNativeStackNavigator();

const App = () => {
  const [sessionCookie, setSessionCookie] = React.useState(null);
  const value = {sessionCookie, setSessionCookie};

  return (
    <SessionContext.Provider value={value}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login" // Define a new screen called "Login"
            component={Login} // Use the Login component
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp" // Define a new screen called "SignUp"
            component={SignUp} // Use the SignUp component
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Table"
            component={Table} // Use a separate component for the screen
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChangePassScreen"
            component={ChangePassScreen} // Use a separate component for the screen
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdmCategories"
            component={AdmCategories} // Use a separate component for the screen
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SessionContext.Provider>
  );
};

export default App;