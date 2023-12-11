import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';

import { postChangePassToApi } from '../utils/apiFetch';
import { AppInput } from '../components/AppInput';
import ScreenTemplate from '../components/ScreenTemplate';
import CustomButton from '../components/CustomButton';


const ChangePassScreen = ({ navigation, route }) => { // Add navigation prop
  const [loading, setLoading] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = React.useState(false);



  const handleSubmit = async () => {
    if (!validatePassword() || !validateRepeatPassword()){
      Alert.alert("Validation Error", "Verify some of the fields and try again");
      return;
    }

    setLoading(true);
    await postChangePassToApi({
      currentPassword,
      newPasswordRepeat,
      newPassword
    }, navigation);
    setLoading(false);
  };

  const navigateToHomeScreen = () => {
    navigation.navigate('Table');
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    const isValid = passwordRegex.test(newPassword);
    setPasswordError(!isValid);
    return isValid;
  };

  const validateRepeatPassword = () => {
    const isValid = newPassword == newPasswordRepeat;
    setRepeatPasswordError(!isValid);
    return isValid;
  };

  return (
    <ScreenTemplate loading={loading}>
      <ScreenTemplate.Logo />

      <ScreenTemplate.Content style={{paddingHorizontal: 15}}>
        <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.textTitleContainer}>
            <Text style={styles.textTitle}>Change password:</Text>
          </View>
          
          <AppInput.Secure
            label="Write your current password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Current Password"
          />

          <AppInput.Secure
            label="Write your new password"
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="New Password"
            onEndEditing={validatePassword && validateRepeatPassword}
            errorMessage={passwordError? "Must contain: 8 letters, 1 number, 1 capital, and 1 symbol." : null}
          />

          <AppInput.Secure
            label="Write your new password again"
            value={newPasswordRepeat}
            onChangeText={setNewPasswordRepeat}
            placeholder="New Password"
            onEndEditing={validateRepeatPassword}
            errorMessage={repeatPasswordError? "Passwords do not match." : null}
          />

          <CustomButton onPress={handleSubmit} label="Change Password" />

          <TouchableOpacity onPress={navigateToHomeScreen}>
            <Text style={{ textAlign: 'center' }}>I don't want to change my password. Send me back.</Text>
          </TouchableOpacity>
        </ScrollView>
      </ScreenTemplate.Content>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  
  // Logo Container

  contentContainer: {
    paddingBottom: 20,

    backgroundColor: 'white', // Background color
  },

  textTitleContainer: {
    marginBottom: '5%',
  },
  
  textTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

});

export default ChangePassScreen;