import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, StyleSheet } from 'react-native';
import { Dialog } from '@rneui/themed';
import { postChangePassToApi } from '../utils/apiFetch';
import { LinearGradient } from 'react-native-linear-gradient';
import { AppInput } from '../components/AppInput';


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

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: 'white',
    flex: 1,
  },

  button: {
    backgroundColor: '#E86DC3',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    margin: 10,
    marginLeft: '10%',
    marginHorizontal: '10%',
  },

  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  
  // Logo Container

  headerContainer: {
    display: 'flex',
    flexDirection: 'row',

    height: 80,
    width: '100%',

    justifyContent: 'space-around',
    alignItems: 'center'
  },

  logoContainer: {
    display: 'flex',
    flexDirection: 'row',

    aspectRatio: 3.55,
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: '100%',
    aspectRatio: 2,
    resizeMode: 'contain',
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
    backgroundColor: 'white', // Background color
    height: '100%',
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingBottom: 20,

    backgroundColor: 'white', // Background color
  },
  

  textStyle: {
    marginLeft: '5%',
    color: 'black',
    marginBottom: '2%',
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

  logo: {
    width: '70%',
    aspectRatio: 4,
    resizeMode: 'contain',

  },

});

export default ChangePassScreen;