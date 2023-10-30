import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { Dialog } from '@rneui/themed';
import { styles } from './style';
import { postChangePassToApi } from '../../utils/apiFetch';
import {LinearGradient} from 'react-native-linear-gradient';


const ChangePassScreen = ({ navigation, route }) => { // Add navigation prop
  const [loading, setLoading] = React.useState(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [newPassword, setNewPassword] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = React.useState(false);



  const handleSubmit = async () => {
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
    // Password validation criteria: at least 8 letters, 1 number, 1 capital, and 1 symbol
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    setPasswordError(!passwordRegex.test(newPassword));
  };

  const validateRepeatPassword = () => {
    setRepeatPasswordError(newPassword != newPasswordRepeat);
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

          <Text style={styles.textTitle}>Change password:</Text>
          <Text style={styles.textStyle}>Write your current password:</Text>
          <TextInput
            secureTextEntry={secureTextEntry}
            style={{ marginLeft: '10%', width: '80%', marginBottom: '5%' }}
            label="Current Password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            right={
              <TextInput.Icon
              icon={secureTextEntry ? 'eye-off' : 'eye'}
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              style={{ color: 'black', fontSize: 36 }}
              />
              }
          />

          <Text style={styles.textStyle}>Write your new password:</Text>
          <TextInput
            secureTextEntry={secureTextEntry}
            style={{ marginLeft: '10%', width: '80%', marginBottom: '5%' }}
            label="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
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

          <Text style={styles.textStyle}>Write your new password again:</Text>
          <TextInput
            secureTextEntry={secureTextEntry}
            style={{ marginLeft: '10%', width: '80%', marginBottom: '5%' }}
            label="New Password"
            value={newPasswordRepeat}
            onChangeText={setNewPasswordRepeat}
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