import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Switch } from 'react-native-paper';
import { Dialog } from '@rneui/themed';
import { AuthContext } from '../context/AuthContext';



const Login = ({ navigation, route }) => { 
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const {signIn} = React.useContext(AuthContext);

  const onToggleSwitch = () => setRememberMe(!rememberMe);

  const navigateToSignUp = () => {
    navigation.navigate('SignUp'); // Navigate to the 'SignUp' screen
  };

  const navigateToForgottenPasswordScreen = () => {
    navigation.navigate('forgotten-password');
  };

  const handleSubmitLogin = async () => {
    setLoading(true);
    await signIn({email, password, rememberMe});
    setLoading(false);
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

        <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
        
          <TextInput
            style={{ marginLeft: '10%', width: '80%', marginBottom: '5%' }}
            label="Email"
            value={email}
            onChangeText={setEmail}
            maxLength={321}
          />

          <TextInput
            secureTextEntry={secureTextEntry}
            style={{ marginLeft: '10%', width: '80%', marginBottom: '5%' }}
            label="Password"
            value={password}
            onChangeText={setPassword}
            maxLength={100}
            right={
              <TextInput.Icon
                icon={secureTextEntry ? 'eye-off' : 'eye'}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
                style={{ color: 'black', fontSize: 36 }}
                />
              }
          />
          <View style={styles.rememberMeContainer}>
            <Text style={styles.rememberMeText} >Remember me:</Text>
            <View style={styles.rememberMeBox}>
              <Switch value={rememberMe} color='green' onValueChange={onToggleSwitch} />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmitLogin}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToSignUp}>
            <Text style={{ textAlign: 'center' }}>Don't have an account? Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToForgottenPasswordScreen}>
            <Text style={{ textAlign: 'center' }}>Forgot your password?</Text>
          </TouchableOpacity>
        
        </ScrollView>
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
    height: '3.5%',
    width: '100%',
    backgroundColor: '#433FF4',
    position: 'absolute',
    marginTop: 95,
  },

  container: {
    flex: 1,
    margin: 10,
    borderRadius: 20,
    backgroundColor: '#AEB4E8', // Background color
    height: '100%',
  },
  contentContainer: {
    marginTop:80,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 20,
    backgroundColor: '#AEB4E8', // Background color
  },
  logo: {
    width: '100%',
    aspectRatio: 4,
    resizeMode: 'contain',
  },

  rememberMeContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    marginHorizontal: '10%',
    justifyContent: 'space-between',
    height: 30,
  },
  rememberMeText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 17,
    height: '100%',
    alignSelf: 'flex-start',
  },

  rememberMeBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    alignSelf: 'flex-end',
  },

});

export default Login;