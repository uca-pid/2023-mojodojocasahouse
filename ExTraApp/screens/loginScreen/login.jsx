import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { styles } from './style';
import { TextInput } from 'react-native-paper';
import { Buffer } from 'buffer';

const Login = ({ navigation, route }) => { // Add navigation prop
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigateToSignUp = () => {
    navigation.navigate('SignUp'); // Navigate to the 'SignUp' screen
  };

  const navigateToHomeScreen = () => {
    navigation.navigate('Table');
  };

  const navigateToForgottenPasswordScreen = () => {
    navigation.navigate('forgotten-password');
  };

  const postLoginFormToApi = async () => {
    let response = await fetch("http://localhost:8080/login", {
      method: 'POST',
      credentials: 'cross-origin',
      headers: {
        Accept: 'application/json',
        Authorization: "Basic " + Buffer.from(email + ':' + password).toString('base64')
      },
      body: new FormData().append('remember-me', true)
    });

    if (response.ok) {
      navigateToHomeScreen();
    } else {
      // If login fails, show an alert
      Alert.alert('Login Failed', 'Please check your credentials and try again.', [
        {
          text: 'OK',
          onPress: () => {
            // Do something when the user presses OK (if needed)
          },
        },
      ]);
    }
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('./../../img/logo.png')} />
        </View>

        <View style={styles.bottomContainer}></View>

        <ScrollView contentContainerStyle={styles.contentContainer}>
        
          <TextInput
            style={{ marginLeft: '10%', width: '80%', marginBottom: '5%' }}
            label="Email"
            value={email}
            onChangeText={email => setEmail(email)}
          />

          <TextInput
            secureTextEntry={true}
            style={{ marginLeft: '10%', width: '80%', marginBottom: '5%' }}
            label="Password"
            value={password}
            onChangeText={password => setPassword(password)}
          />

          <TouchableOpacity style={styles.button} onPress={postLoginFormToApi}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>

          {/* Wrap the text with TouchableOpacity to navigate to SignUp */}
          <TouchableOpacity onPress={navigateToSignUp}>
            <Text style={{ textAlign: 'center' }}>Don't have an account? Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToForgottenPasswordScreen}>
            <Text style={{ textAlign: 'center' }}>Forgot your password?</Text>
          </TouchableOpacity>
        
        </ScrollView>
      </View>
    </View>
  );
};

export default Login;