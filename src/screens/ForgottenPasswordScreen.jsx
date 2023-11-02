import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Dialog } from '@rneui/themed';
import * as EmailValidator from 'email-validator';
import { postForgottenPasswordFormToApi } from '../utils/apiFetch';

import LoginSVG from '../../img/login.svg';
import CustomButton from '../components/CustomButton';
import { AppInput } from '../components/AppInput';

const ForgottenPasswordScreen = ({ navigation, route }) => {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const handleSubmit = async () => {
    setLoading(true);
    await postForgottenPasswordFormToApi(formHasErrors, email, navigation);
    setLoading(false);
  };

  const formHasErrors = () => {
    return checkEmailHasErrors(email);
  }

  const checkEmailHasErrors = (emailInput) => {
    let isValid = EmailValidator.validate(emailInput);
    setEmailError(!isValid);
    return !isValid;
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <Dialog isVisible={loading}>
        <Dialog.Loading />
      </Dialog>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <LoginSVG
            height={270}
            width={270}
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
          Password recovery
        </Text>

        <AppInput.Email
          value={email}
          onChangeText={setEmail}
          onEndEditing={checkEmailHasErrors}
          errorMessage={emailError? "Email must be valid." : null}
        />
        
        <CustomButton label={"Start"} onPress={handleSubmit} />


        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Remembered?</Text>
          <TouchableOpacity onPress={navigateToLogin}>
            <Text style={{color: '#E86DC3', fontWeight: '700'}}> Tap here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgottenPasswordScreen;