import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { styles } from './style';
import { TextInput } from 'react-native-paper';
import { Buffer } from 'buffer'; 
import { fetchWithTimeout } from '../../utils/fetchingUtils';
import LoadingOverlay from '../../components/loading/loading';


const Login = ({ navigation, route }) => { 
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

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
    setLoading(true);
    try {
      let response = await fetchWithTimeout("http://localhost:8080/login", {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          Authorization: "Basic " + Buffer.from(email + ":" + password, 'utf8').toString('base64')
        },
        body: new FormData().append('remember-me', false)
      });
      let responseBody = await response.json();
      setLoading(false);

      if (response.ok) {
        navigateToHomeScreen();
        return;
      }
      Alert.alert("API Error", responseBody.message);

    } catch (error) {
      setLoading(false);
      Alert.alert("Connection Error", "There was an error connecting to API");
    }
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.container}>

        <LoadingOverlay 
          shown={loading}
        />

        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('./../../img/logo.png')} />
        </View>

        <View style={styles.bottomContainer}></View>

        <View>
          <TextInput
            style={{ marginLeft: '10%', width: '80%', marginBottom: '5%' }}
            label="Email"
            value={email}
            onChangeText={email => setEmail(email)}
          />

          <TextInput
            style={{ marginLeft: '10%', width: '80%', marginBottom: '5%' }}
            label="Password"
            value={password}
            onChangeText={password => setPassword(password)}
          />

          <TouchableOpacity style={styles.button} onPress={postLoginFormToApi}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToSignUp}>
            <Text style={{ textAlign: 'center' }}>Don't have an account? Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToForgottenPasswordScreen}>
            <Text style={{ textAlign: 'center' }}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;