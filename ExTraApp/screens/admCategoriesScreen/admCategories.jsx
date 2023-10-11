import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { styles, selectButtons } from './style';
import { TextInput } from 'react-native-paper';

const AdmCategories = ({ navigation, route }) => { // Add navigation prop
  const [newPassword, setNewPassword] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = React.useState("");


  const navigateToHomeScreen = () => {
    navigation.navigate('Table');
  };


  return (
    <View style={styles.appContainer}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('./../../img/logo.png')} />
        </View>

        <View style={styles.bottomContainer}></View>

        <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text>Add New Category:</Text>
            <Text>Name:</Text>
          <TextInput
          
            style={{ marginLeft: '10%', width: '80%', marginBottom: '5%' }}
            label="Password"
            value={password}
            onChangeText={password => setPassword(password)}
          />
            <Text>Write your new password:</Text>
          <TextInput
            secureTextEntry={true}
            style={{ marginLeft: '10%', width: '80%', marginBottom: '5%' }}
            label="Password"
            value={newPassword}
            onChangeText={newPassword => setNewPassword(newPassword)}

          />
          <Text>Write your new password again:</Text>
          <TextInput
            secureTextEntry={true}
            style={{ marginLeft: '10%', width: '80%', marginBottom: '5%' }}
            label="Password"
            value={newPasswordRepeat}
            onChangeText={newPasswordRepeat => setNewPasswordRepeat(newPasswordRepeat)}
          />

          <TouchableOpacity style={styles.button}>
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

export default AdmCategories;