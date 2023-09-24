import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import Login from './screens/loginScreen/login';
import Table from './screens/tableScreen/table';
import SignUp from './screens/signUpScreen/signUp';

const Stack = createNativeStackNavigator();



const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  
  const LogIn = () => {
    return(
      <Login loginFunction={setLoggedIn}/>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        { !loggedIn ?
        <>
        <Stack.Screen
          name="Login" // Define a new screen called "Login"
          component={LogIn} // Use the Login component
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp" // Define a new screen called "SignUp"
          component={SignUp} // Use the SignUp component
          options={{ headerShown: false }}
        />
        
        </>
        :
        <Stack.Screen
          name="Home"
          component={Table} // Use a separate component for the screen
          options={{ headerShown: false }}
        />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;