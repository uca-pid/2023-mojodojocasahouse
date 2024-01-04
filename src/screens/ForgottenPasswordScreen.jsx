import React from 'react';
import { View, Text, SafeAreaView, Alert } from 'react-native';
import { Dialog } from '@rneui/themed';
import * as EmailValidator from 'email-validator';

import LoginSVG from '../../img/login.svg';
import CustomButton from '../components/CustomButton';
import { AppInput } from '../components/AppInput';
import { useForgottenPasswordForm } from '../hooks/authentication';
import HelperLink from '../components/HelperLink';


const ForgottenPasswordScreen = ({ navigation, route }) => {
  const [email, setEmail] = React.useState("");

  const [emailError, setEmailError] = React.useState(false);
  
  const { isPending: loading, mutate: sendForm } = useForgottenPasswordForm();

  
  const handleSubmit = () => {
    if( formHasErrors() ) {
      Alert.alert("Validation Error", "Check your fields and try again");
      return;
    }

    sendForm(email);
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

        <HelperLink 
          label="Remembered?"
          highlightedText="Go back"
          onPress={() => navigation.goBack()}
        />
      </View>
    </SafeAreaView>
  );
};

export default ForgottenPasswordScreen;