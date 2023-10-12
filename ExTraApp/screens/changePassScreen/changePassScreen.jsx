import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert, } from 'react-native';
import { styles } from './style';
import { TextInput, HelperText } from 'react-native-paper';
import LoadingOverlay from '../../components/loading/loading';


const ChangePassScreen = ({ navigation, route }) => { // Add navigation prop
  const [loading, setLoading] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = React.useState(false);



  const postChangePassToApi = async () => {
    setLoading(true);
    try {
      let response = await fetch("http://localhost:8080/auth/password/change", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          password: password,
          passwordRepeat: newPasswordRepeat,
          newPassword: newPassword

        })
      });
      let responseBody = await response.json();
      setLoading(false);

      // OK
      if(response.ok){
        Alert.alert("User Creation Success", "User was created successfully", [{text: 'OK', onPress: navigateToHomeScreen}]);
        return;
      }

      // OTHER ERROR
      Alert.alert("API Error", responseBody.message);

    } catch (error) {
      Alert.alert(
        "Connection Error", 
        "There was an error connecting to API"
      );
    }
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
    <View style={styles.appContainer}>
      <View style={styles.container}>
      <LoadingOverlay 
          shown={loading}
        />
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('./../../img/logo.png')} />
        </View>

        <View style={styles.bottomContainer}></View>
        <ScrollView contentContainerStyle={styles.contentContainer}>

            <Text style={styles.textTitle}>Change password:</Text>
            <Text style={styles.textStyle}>Write your current password:</Text>
          <TextInput
          secureTextEntry={true}
            style={{ marginLeft: '10%', width: '80%', marginBottom: '5%' }}
            label="Current Password"
            value={password}
            onChangeText={password => setPassword(password)}
          />
            <Text style={styles.textStyle}>Write your new password:</Text>
          <TextInput
            secureTextEntry={true}
            style={{ marginLeft: '10%', width: '80%', marginBottom: '5%' }}
            label="New Password"
            value={newPassword}
            onChangeText={newPassword => setNewPassword(newPassword)}
            maxLength={100}
            onBlur={validatePassword}
          />
          <HelperText type="error" visible={passwordError}>
            Must contain: 8 letters, 1 number, 1 capital, and 1 symbol.
          </HelperText>

          <Text style={styles.textStyle}>Write your new password again:</Text>
          <TextInput
            secureTextEntry={true}
            style={{ marginLeft: '10%', width: '80%', marginBottom: '5%' }}
            label="New Password"
            value={newPasswordRepeat}
            onChangeText={newPasswordRepeat => setNewPasswordRepeat(newPasswordRepeat)}
            maxLength={100}
            onBlur={validateRepeatPassword}
          />
          <HelperText type="error" visible={repeatPasswordError}>
            Passwords do not match.
          </HelperText>


          <TouchableOpacity style={styles.button} onPress={postChangePassToApi}>
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>

          {/* Wrap the text with TouchableOpacity to navigate to SignUp */}
          <TouchableOpacity onPress={navigateToHomeScreen}>
            <Text style={{ textAlign: 'center' }}>I don't want to change my password. Send me back.</Text>
          </TouchableOpacity>
          </ScrollView>
      </View>
    </View>
  );
};

export default ChangePassScreen;