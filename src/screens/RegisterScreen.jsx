import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Alert } from 'react-native';
import EmailValidator from 'email-validator';
import { Dialog } from '@rneui/themed';

import RegistrationSVG from '../../img/registration.svg';
import CustomButton from '../components/CustomButton';
import { AppInput } from '../components/AppInput';
import { useRegistrationForm } from '../hooks/authentication';
import HelperLink from '../components/HelperLink';


const RegisterScreen = ({navigation}) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordRepeat, setPasswordRepeat] = React.useState("");

  const [firstNameError, setFirstNameError] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordRepeatError, setPasswordRepeatError] = React.useState(false);

  const { isPending: loading, mutate: sendForm } = useRegistrationForm();

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
    setPasswordRepeatError(password != passwordRepeat);
  };

  const fieldsAreValid = () => {
    validateEmail();
    validateFirstName();
    validateLastName();
    validatePassword();
    validateRepeatPassword();

    return !(lastNameError || firstNameError || emailError || passwordError || passwordRepeatError); 
  };

  const handleSubmit = async () => {
    if( !fieldsAreValid() ){
      Alert.alert("Validation Error", "Check your fields and try again");
      return;
    }

    console.log({
      firstName,
      lastName,
      email,
      password,
      passwordRepeat
    });
    sendForm({
      firstName,
      lastName,
      email,
      password,
      passwordRepeat
    });
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>

      <Dialog isVisible={loading}>
        <Dialog.Loading />
      </Dialog>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}
      >
      
        <View style={{alignItems: 'center'}}>
          <RegistrationSVG
            height={300}
            width={300}
            style={{transform: [{rotate: '-5deg'}]}}
          />
        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Register
        </Text>


        <AppInput.Name 
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First name"
          errorMessage={firstNameError? "First Name can only contain letters or spaces." : null}
        />

        <AppInput.Name 
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last name"
          errorMessage={lastNameError? "Last Name can only contain letters or spaces." : null}
        />

        <AppInput.Email 
          value={email}
          onChangeText={setEmail}
          errorMessage={emailError? "Email must be valid." : null}
        />

        <AppInput.Secure 
          value={password}
          onChangeText={setPassword}
          errorMessage={passwordError? "Must contain: 8 letters, 1 number, 1 capital, and 1 symbol." : null}
        />

        <AppInput.Secure 
          value={passwordRepeat}
          onChangeText={setPasswordRepeat}
          placeholder="Password repeat"
          errorMessage={passwordRepeatError? "Passwords must match" : null}
        />

        <CustomButton label={'Register'} onPress={handleSubmit} />

        <HelperLink 
          label="Already registered?" 
          highlightedText="Login"
          onPress={() => navigation.navigate("Login")}
        />

      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
