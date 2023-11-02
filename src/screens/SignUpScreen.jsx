import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import EmailValidator from 'email-validator';
import { Dialog } from '@rneui/themed';

import { postRegistrationToApi } from '../utils/apiFetch';




const SignUpScreen = ({navigation, route}) => {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [passwordRepeat, setRepeatPassword] = React.useState("");
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = React.useState(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const navigateToLogin = () => {
    navigation.navigate('Login'); // Navigate back to the 'Login' screen
  };

  const validateEmail = () => {
    setEmailError(!EmailValidator.validate(email));
  };

  const validateFirstName = () => {
    const regex = /^[a-zA-Z ,.'-]+$/;
    setFirstNameError(!regex.test(firstName));
  };

  const validateLastName = () => {
    const regex = /^[a-zA-Z ,.'-]+$/;
    setLastNameError(!regex.test(lastName));
  };

  const validatePassword = () => {
    // Password validation criteria: at least 8 letters, 1 number, 1 capital, and 1 symbol
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    setPasswordError(!passwordRegex.test(password));
  };

  const validateRepeatPassword = () => {
    setRepeatPasswordError(password != passwordRepeat);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await postRegistrationToApi({
      firstName,
      lastName,
      email,
      password,
      passwordRepeat
    }, navigation);
    setLoading(false);
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.container}>

        <Dialog isVisible={loading}>
          <Dialog.Loading />
        </Dialog>

        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('./../../img/logo.png')} />
        </View>

        <View style={styles.bottomContainer} />

        <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">

          <TextInput
            style={{ marginLeft: '10%', width: '80%', marginBottom: '9%' }}
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
            onBlur={validateFirstName}
            maxLength={100}
          />
          <HelperText type="error" style={{display: 'none'}} visible={firstNameError}>
            First Name can only contain letters or spaces.
          </HelperText>

          <TextInput
            style={{ marginLeft: '10%', width: '80%', marginBottom: '9%' }}
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            onBlur={validateLastName}
            maxLength={100}
          />
          <HelperText type="error" style={{display: 'none'}} visible={lastNameError}>
            Last name can only contain letters or spaces.
          </HelperText>

          <TextInput
            style={{ marginLeft: '10%', width: '80%', marginBottom: '2%' }}
            label="Email"
            value={email}
            onChangeText={setEmail}
            onBlur={validateEmail}
            maxLength={321}
          />
          <HelperText type="error" visible={emailError}>
            Email must be valid.
          </HelperText>

          <TextInput
            secureTextEntry={secureTextEntry}
            style={{ marginLeft: '10%', width: '80%', marginBottom: '5%' }}
            label="Password"
            value={password}
            onChangeText={setPassword}
            onBlur={validatePassword}
            maxLength={100}
            right={
              <TextInput.Icon
              icon={secureTextEntry ? 'eye-off' : 'eye'}
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              style={{ color: 'black', fontSize: 36 }}
              />
            }
          />
          
          <HelperText type="error" visible={passwordError}>
            Must contain: 8 letters, 1 number, 1 capital, and 1 symbol.
          </HelperText>

          <TextInput
            secureTextEntry={secureTextEntry}
            style={{ marginLeft: '10%', width: '80%', marginBottom: '5%' }}
            label="Password"
            value={passwordRepeat}
            onChangeText={setRepeatPassword}
            onBlur={validateRepeatPassword}
            maxLength={100}
            right={
              <TextInput.Icon
              icon={secureTextEntry ? 'eye-off' : 'eye'}
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              style={{ color: 'black', fontSize: 36 }}
              />
            }
          />
          <HelperText type="error" visible={repeatPasswordError}>
            Passwords do not match.
          </HelperText>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToLogin}>
            <Text style={{ textAlign: 'center' }}>Have an account already? Log in</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: 'white',
    flex: 1,
  },

  button: {
    backgroundColor: 'lightgray',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    margin: 10,
    marginLeft: '30%',
    marginHorizontal: '30%',
  },

  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  
  logoContainer: {
    flexDirection: 'row',
    display: 'flex',
    height: '10%',
    margin: 5,
  },

  bottomContainer: {
    height: '3.5%',
    width: '100%',
    backgroundColor: '#433FF4',
    position: 'absolute',
    marginTop: 95,
  },

  container: {
    flex: 1,
    margin: 10,
    borderRadius: 20,
    backgroundColor: '#AEB4E8', // Background color
    height: '100%',
  },
  contentContainer: {
    marginTop:80,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 20,
    backgroundColor: '#AEB4E8', // Background color
  },
  logo: {
    width: '100%',
    aspectRatio: 4,
    resizeMode: 'contain',
  },
});

export default SignUpScreen;