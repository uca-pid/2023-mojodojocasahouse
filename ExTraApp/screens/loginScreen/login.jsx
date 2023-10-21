import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { styles } from './style';
import { TextInput, Switch } from 'react-native-paper';
import { postLoginFormToApi } from '../../utils/apiFetch';
import LoadingOverlay from '../../components/loading/loading';



const Login = ({ navigation, route }) => { 
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);

  const onToggleSwitch = () => setRememberMe(!rememberMe);

  const navigateToSignUp = () => {
    navigation.navigate('SignUp'); // Navigate to the 'SignUp' screen
  };

  const navigateToForgottenPasswordScreen = () => {
    navigation.navigate('forgotten-password');
  };

  const handleSubmitLogin = async () => {
    setLoading(true);
    await postLoginFormToApi(navigation, {email, password, rememberMe});
    setLoading(false);
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

        <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
        
          <TextInput
            style={{ marginLeft: '10%', width: '80%', marginBottom: '5%' }}
            label="Email"
            value={email}
            onChangeText={email => setEmail(email)}
            maxLength={321}
          />

          <TextInput
            secureTextEntry={secureTextEntry}
            style={{ marginLeft: '10%', width: '80%', marginBottom: '5%' }}
            label="Password"
            value={password}
            onChangeText={password => setPassword(password)}
            maxLength={100}
            right={
              <TextInput.Icon
                icon={secureTextEntry ? 'eye-off' : 'eye'}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
                style={{ color: 'black', fontSize: 36 }}
                />
              }
          />
          <Text style={styles.rememberMeText} >Remember me:</Text>
          <Text style={styles.rememberMeBox}><Switch value={rememberMe} onValueChange={onToggleSwitch} /></Text>

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

export default Login;