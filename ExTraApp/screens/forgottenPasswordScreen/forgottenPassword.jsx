import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './style';
import { TextInput } from 'react-native-paper';
import LoadingOverlay from '../../components/loading/loading';

const ForgottenPassword = ({ navigation, route }) => {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const navigateToSignUp = () => {
    navigation.navigate('SignUp'); // Navigate to the 'SignUp' screen
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const postForgottenPasswordFormToApi = async () => {

    setLoading(true);
    let response = await fetch("http://localhost:8080/auth/forgotten", {
    method: 'POST',
    credentials: 'include',
    headers: {
        Accept: 'application/json',
        'Content-Type':'application/json',
    },
    body: JSON.stringify({
        email: email
    })
    });
    setLoading(false);

    if(response.ok){
        navigateToLogin();
    }
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.container}>
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

          <TouchableOpacity style={styles.button} onPress={postForgottenPasswordFormToApi}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToLogin}>
            <Text style={{ textAlign: 'center' }}>Back to login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToSignUp}>
            <Text style={{ textAlign: 'center' }}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </View>

        <LoadingOverlay 
            shown={loading}
        />
      </View>
    </View>
  );
};

export default ForgottenPassword;