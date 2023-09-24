import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { styles } from './style';
import { TextInput } from 'react-native-paper';




//1 solo punto, carpeta actual, 2 puntos es un directorio para arriba
const SignUp = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  const navigateToLogin = () => {
    props.navigation.navigate('Login'); // Navigate back to the 'Login' screen
  };
  return (
<View style={styles.appContainer}>
    <View style={styles.container}>
       <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('./../../img/logo.png')} /> 
      </View>
      <View style={styles.bottomContainer}>
      </View>
      <View>
    
        <TextInput style={{marginLeft: '10%', width: '80%', marginBottom: '5%' }}
        label="Email"
        value={email}
        onChangeText={email => setEmail(email)}
    />
    
        <TextInput style={{marginLeft: '10%', width: '80%', marginBottom: '5%' }}
        label="Password"
        value={password}
        onChangeText={password => setPassword(password)}
    />

      <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
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