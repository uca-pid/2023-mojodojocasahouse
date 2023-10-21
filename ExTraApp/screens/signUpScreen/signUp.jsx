import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import EmailValidator from 'email-validator';

import { styles } from './style';
import LoadingOverlay from '../../components/loading/loading';
import { postRegistrationToApi } from '../../utils/apiFetch';




const SignUp = ({navigation, route}) => {
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

        <LoadingOverlay 
          shown={loading}
        />

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
            onChangeText={password => setPassword(password)}
            maxLength={100}
            onBlur={validatePassword}
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
            onChangeText={password => setRepeatPassword(password)}
            maxLength={100}
            onBlur={validateRepeatPassword}
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

export default SignUp;