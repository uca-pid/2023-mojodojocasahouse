import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import ScreenTemplate from '../components/ScreenTemplate';
import { usePasswordResetForm } from '../hooks/authentication';
import { AppInput } from '../components/AppInput';


const ResetPasswordScreen = ({ navigation, route }) => {
  const [newPassword, setNewPassword] = React.useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = React.useState("");

  const [passwordError, setPasswordError] = React.useState(true);
  const [repeatPasswordError, setRepeatPasswordError] = React.useState(false);

  const { isPending: loading, mutate: sendForm } = usePasswordResetForm();


  const navigateToLogin = () => {
    navigation.navigate("drawer");
  };

  const handleSubmit = () => {
    if( formHasErrors() ){
      Alert.alert("Validation Error", "Please check selected fields and try again");
      return;
    }

    sendForm({
      newPassword,
      newPasswordRepeat,
      token: route.params.token
    });
  };



  const formHasErrors = () => {
    return (checkNewPasswordHasErrors() || checkRepeatedPasswordDoesNotMatch());
  }

  const checkNewPasswordHasErrors = () => {
    let isWeak = ! newPassword.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?]{8,}$/);
    setPasswordError(isWeak);
    return isWeak;
  };

  const checkRepeatedPasswordDoesNotMatch = () => {
    let areDifferent = newPassword != newPasswordRepeat;
    setRepeatPasswordError(areDifferent);
    return areDifferent;
  };

  return (
    <ScreenTemplate loading={loading}>
      <ScreenTemplate.Logo />

      <ScreenTemplate.Content>
        <View style={styles.bottomContainer}></View>

        <View>

          <AppInput.Secure
            label="Write your new password"
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="New Password"
            onEndEditing={() => (checkNewPasswordHasErrors() && checkRepeatedPasswordDoesNotMatch())}
            errorMessage={passwordError? "Must contain: 8 letters, 1 number, 1 capital, and 1 symbol." : null}
          />

          <AppInput.Secure
            label="Write your new password again"
            value={newPasswordRepeat}
            onChangeText={setNewPasswordRepeat}
            placeholder="New password"
            onEndEditing={checkRepeatedPasswordDoesNotMatch}
            errorMessage={repeatPasswordError? "Passwords do not match." : null}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScreenTemplate.Content>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({

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

  bottomContainer: {
    height: '4.5%',
    width: '100%',
    marginTop: '4%',
    backgroundColor: '#433FF4',
    marginBottom: '10%',
  },

});

export default ResetPasswordScreen;