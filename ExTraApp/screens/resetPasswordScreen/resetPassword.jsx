import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Dialog } from '@rneui/themed';
import { styles } from './style';
import { TextInput, HelperText } from 'react-native-paper';
import LoadingOverlay from '../../components/loading/loading';
import { postResetPasswordFormToApi } from '../../utils/apiFetch';

const ResetPassword = ({ navigation, route }) => {
  const [newPassword, setNewPassword] = React.useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = React.useState("");
  const [hiddenPassword, setHiddenPassword] = React.useState(true);
  const [passwordTooWeak, setPasswordTooWeak] = React.useState(true);
  const [passwordsDoNotMatch, setPasswordsDoNotMatch] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const handleSubmit = async () => {
    setLoading(true);
    await postResetPasswordFormToApi(formHasErrors, {newPassword, newPasswordRepeat, token: route.params.token})
    setLoading(false);
  };



  const formHasErrors = () => {
    return (checkNewPasswordHasErrors() || checkRepeatedPasswordDoesNotMatch());
  }

  const checkNewPasswordHasErrors = () => {
    let isWeak = ! newPassword.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?]{8,}$/);
    setPasswordTooWeak(isWeak);
    return isWeak;
  };

  const checkRepeatedPasswordDoesNotMatch = () => {
    let areDifferent = newPassword != newPasswordRepeat;
    setPasswordsDoNotMatch(areDifferent);
    return areDifferent;
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

          <TextInput
            style={{ marginLeft: '10%', width: '80%', marginTop: '1%' }}
            label="New password"
            value={newPassword}
            onChangeText={setNewPassword}
            onEndEditing={() => {checkNewPasswordHasErrors() && checkRepeatedPasswordDoesNotMatch()}}
            secureTextEntry={hiddenPassword}
          />

          <HelperText type="error" visible={passwordTooWeak}>
            Password must have at least 8 characters, one uppercase letter, one lowercase, one number and one of the following: @$!%*#?
          </HelperText>

          <TextInput
            style={{ marginLeft: '10%', width: '80%', marginTop: '5%' }}
            label="Repeat new password"
            value={newPasswordRepeat}
            onChangeText={setNewPasswordRepeat}
            onEndEditing={checkRepeatedPasswordDoesNotMatch}
            secureTextEntry={hiddenPassword}
          />

          <HelperText type="error" visible={passwordsDoNotMatch}>
            Passwords must match
          </HelperText>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ResetPassword;