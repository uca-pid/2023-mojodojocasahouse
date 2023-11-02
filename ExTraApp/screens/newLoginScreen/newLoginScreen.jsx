import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Switch } from 'react-native-paper';

import LoginSVG from '../../img/login.svg';
import CustomButton from '../../components/customButton/customButton';
import { AppInput } from '../../components/inputField/customInputs';
import { AuthContext } from '../../context/authContext';
import { Dialog } from '@rneui/themed';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const {signIn} = React.useContext(AuthContext);

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
          }} >Remember me:</Text>

          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Switch value={rememberMe} color='#E86DC3' onValueChange={() => setRememberMe(!rememberMe)} />
          </View>
        </View>
        
        <CustomButton label={"Login"} onPress={handleSubmitLogin} />


        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 15,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{color: '#E86DC3', fontWeight: '700'}}> Register</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Forgot your password?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('forgotten-password')}>
            <Text style={{color: '#E86DC3', fontWeight: '700'}}> Tap here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
