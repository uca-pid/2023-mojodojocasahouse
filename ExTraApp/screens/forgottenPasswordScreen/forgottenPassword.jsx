import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './style';
import { Dialog } from '@rneui/themed';
import LoadingOverlay from '../../components/loading/loading';
import * as EmailValidator from 'email-validator';
import ValidatedTextInput from '../../components/validatedTextInput/validatedTextInput';
import { postForgottenPasswordFormToApi } from '../../utils/apiFetch';

const ForgottenPassword = ({ navigation, route }) => {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const navigateToSignUp = () => {
    navigation.navigate('SignUp'); // Navigate to the 'SignUp' screen
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const handleSubmit = async () => {
    setLoading(true);
    await postForgottenPasswordFormToApi(formHasErrors, email, navigation);
    setLoading(false);
  };

  const formHasErrors = () => {
    return emailHasErrors(email);
  }

  const emailHasErrors = (emailInput) => {
    return !EmailValidator.validate(emailInput);
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.container}>
        <Dialog isVisible={loading}>
          <Dialog.Loading />
        </Dialog>

        {/* <LoadingOverlay 
          shown={loading}
        /> */}

        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('./../../img/logo.png')} />
        </View>

        <View style={styles.bottomContainer}></View>

        <View>
          <ValidatedTextInput 
            label="Email"
            value={email}
            onChangeText={setEmail}
            hasError={emailHasErrors}
            validationErrorMessage="Email address is invalid"
            maxLength={321}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToLogin}>
            <Text style={{ textAlign: 'center' }}>Back to login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToSignUp}>
            <Text style={{ textAlign: 'center' }}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgottenPassword;