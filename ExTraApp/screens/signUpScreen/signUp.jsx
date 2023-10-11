import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { styles } from './style';
import { TextInput, HelperText } from 'react-native-paper';
import LoadingOverlay from '../../components/loading/loading';
import EmailValidator from 'email-validator';




const SignUp = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = React.useState(false);

  const navigateToLogin = () => {
    props.navigation.navigate('Login'); // Navigate back to the 'Login' screen
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
    setRepeatPasswordError(password != repeatPassword);
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

        <ScrollView contentContainerStyle={styles.contentContainer}>

          <TextInput
            style={{ marginLeft: '10%', width: '80%', marginBottom: '9%' }}
            label="First Name"
            value={firstName}
            onChangeText={firstName => setFirstName(firstName)}
            onBlur={validateFirstName}
          />
          <HelperText type="error" style={{display: 'none'}} visible={emailError}>
            First Name can only contain letters or spaces.
          </HelperText>

          <TextInput
            style={{ marginLeft: '10%', width: '80%', marginBottom: '9%' }}
            label="Last Name"
            value={lastName}
            onChangeText={lastName => setLastName(lastName)}
            onBlur={validateLastName}
          />
          <HelperText type="error" style={{display: 'none'}} visible={emailError}>
            Last name can only contain letters or spaces.
          </HelperText>

          <TextInput
            style={{ marginLeft: '10%', width: '80%', marginBottom: '2%' }}
            label="Email"
            value={email}
            onChangeText={email => setEmail(email)}
            onBlur={validateEmail}
          />
          <HelperText type="error" visible={emailError}>
            Email must be valid.
          </HelperText>

          <TextInput
            secureTextEntry={true}
            style={{ marginLeft: '10%', width: '80%', marginBottom: '2%' }}
            label="Password"
            value={password}
            onChangeText={password => setPassword(password)}
            onBlur={validatePassword}
          />
          <HelperText type="error" visible={passwordError}>
            Must contain: 8 letters, 1 number, 1 capital, and 1 symbol.
          </HelperText>

          <TextInput
            secureTextEntry={true}
            style={{ marginLeft: '10%', width: '80%' }}
            label="Password"
            value={repeatPassword}
            onChangeText={repeatPassword => setRepeatPassword(repeatPassword)}
            onBlur={validateRepeatPassword}
          />
          <HelperText type="error" visible={repeatPasswordError}>
            Passwords do not match.
          </HelperText>

          <TouchableOpacity style={styles.button} onPress={postRegistrationToApi}>
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

export default SignUp;