import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { Dialog, Switch } from '@rneui/themed';

import LoginSVG from '../../img/login.svg';
import CustomButton from '../components/CustomButton';
import { AppInput } from '../components/AppInput';
import { useAuthentication } from '../hooks/authentication';
import HelperLink from '../components/HelperLink';

// FIXME: Use new signIn call

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);

  const { signIn } = useAuthentication();
  const [loading, setLoading] = React.useState(false);

  const handleSubmitLogin = async () => {
    setLoading(true);
    await signIn({email, password, rememberMe});
    setLoading(false);
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <Dialog isVisible={loading}>
        <Dialog.Loading />
      </Dialog>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <LoginSVG
            height={270}
            width={270}
            style={{transform: [{rotate: '-5deg'}]}}
          />
        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Login
        </Text>

        <AppInput.Email 
          value={email}
          onChangeText={setEmail}
        />

        <AppInput.Secure
          value={password}
          onChangeText={setPassword}
        />

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 30,
          marginBottom: 20,
        }}>
          <Text style={{
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black',
          }} >Remember me:</Text>

          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Switch value={rememberMe} color='#E86DC3' onValueChange={() => setRememberMe(!rememberMe)} />
          </View>
        </View>
        
        <CustomButton label={"Login"} onPress={handleSubmitLogin} />

        <HelperLink 
          label="New to the app?"
          highlightedText="Register"
          onPress={() => navigation.navigate('SignUp')}
        />

        <HelperLink 
          label="Forgot your password?"
          highlightedText="Tap here"
          onPress={() => navigation.navigate('forgotten-password')}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
