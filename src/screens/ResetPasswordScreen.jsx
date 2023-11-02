import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { Dialog } from '@rneui/themed';
import { TextInput, HelperText } from 'react-native-paper';
import { postResetPasswordFormToApi } from '../utils/apiFetch';

const ResetPasswordScreen = ({ navigation, route }) => {
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
    height: '4.5%',
    width: '100%',
    marginTop: '4%',
    backgroundColor: '#433FF4',
    marginBottom: '10%',
  },

  container: {
    flex: 1,
    margin: 10,
    borderRadius: 20,
    backgroundColor: '#AEB4E8', // Background color
  },
  logo: {
    width: '70%',
    aspectRatio: 4,
    resizeMode: 'contain',
  },

});

export default ResetPasswordScreen;