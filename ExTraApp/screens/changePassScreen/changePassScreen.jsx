import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Dialog } from '@rneui/themed';
import { styles } from './style';
import { postChangePassToApi } from '../../utils/apiFetch';
import { LinearGradient } from 'react-native-linear-gradient';
import { AppInput } from '../../components/inputField/customInputs';


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
    <LinearGradient colors={['#E86DC3', 'white']} style={styles.appContainer}>
      <View style={styles.container}>
        <Dialog isVisible={loading}>
          <Dialog.Loading />
        </Dialog>

        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('./../../img/logo.png')} />
        </View>


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
            onEndEditing={validatePassword}
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

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToHomeScreen}>
            <Text style={{ textAlign: 'center' }}>I don't want to change my password. Send me back.</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      </LinearGradient>
  );
};

export default ChangePassScreen;