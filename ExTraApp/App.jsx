import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/loginScreen/login';
import Table from './screens/tableScreen/table';
import SignUp from './screens/signUpScreen/signUp';
import ChangePassScreen from './screens/changePassScreen/changePassScreen';
import AdmCategories from './screens/admCategoriesScreen/admCategories';
import ForgottenPassword from './screens/forgottenPasswordScreen/forgottenPassword';
import ResetPassword from './screens/resetPasswordScreen/resetPassword';
import RedirectScreen from './screens/redirectScreen/redirect';

const Stack = createNativeStackNavigator();

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

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="redirect">
        <Stack.Screen 
          name="redirect"
          component={RedirectScreen}
          options={{ headerShown: false }}
        />
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
        <Stack.Screen
          name="forgotten-password"
          component={ForgottenPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="reset-password"
          component={ResetPassword}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;