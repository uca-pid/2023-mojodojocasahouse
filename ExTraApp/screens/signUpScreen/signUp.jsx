import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { styles } from './style';
import { TextInput } from 'react-native-paper';
import LoadingOverlay from '../../components/loading/loading';


//1 solo punto, carpeta actual, 2 puntos es un directorio para arriba
const SignUp = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  
  const navigateToLogin = () => {
    props.navigation.navigate('Login'); // Navigate back to the 'Login' screen
  };

  const postRegistrationToApi = async () => {
    setLoading(true);
    try {
      let response = await fetch("http://localhost:8080/register", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          passwordRepeat: repeatPassword
        })
      });
      let responseBody = await response.json();
      setLoading(false);

      // OK
      if(response.ok){
        Alert.alert("User Creation Success", "User was created successfully", [{text: 'OK', onPress: navigateToLogin}]);
        return;
      }

      // OTHER ERROR
      Alert.alert("API Error", responseBody.message);

    } catch (error) {
      Alert.alert(
        "Connection Error", 
        "There was an error connecting to API"
      );
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

        <View style={styles.bottomContainer} />

        <View>
          
          <TextInput 
            style={{marginLeft: '10%', width: '80%', marginBottom: '5%' }}
            label="First Name"
            value={firstName}
            onChangeText={firstName => setFirstName(firstName)}
          />

          <TextInput 
            style={{marginLeft: '10%', width: '80%', marginBottom: '5%' }}
            label="Last Name"
            value={lastName}
            onChangeText={lastName => setLastName(lastName)}
          />

          <TextInput 
            style={{marginLeft: '10%', width: '80%', marginBottom: '5%' }}
            label="Email"
            value={email}
            onChangeText={email => setEmail(email)}
          />

          <TextInput 
            style={{marginLeft: '10%', width: '80%', marginBottom: '5%' }}
            label="Password"
            value={password}
            onChangeText={password => setPassword(password)}
          />

          <TextInput 
            style={{marginLeft: '10%', width: '80%', marginBottom: '5%' }}
            label="Password"
            value={repeatPassword}
            onChangeText={repeatPassword => setRepeatPassword(repeatPassword)}
          />

          <TouchableOpacity style={styles.button} onPress={postRegistrationToApi}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToLogin}> 
            <Text style={{textAlign: 'center', }}>
              Have an account already? Log in
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>  
  );
};

export default SignUp