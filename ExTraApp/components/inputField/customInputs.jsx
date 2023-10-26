import React from "react";
import { Input } from "@rneui/themed";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AppInput = () => {

};

const EmailInput = (props) => {

  return(
    <Input 
      value={props.value}
      onChangeText={props.onChangeText}
      placeholder={props.placeholder || 'Email'}
      containerStyle={{
        width: '100%',
        paddingHorizontal: 0,
      }}
      inputContainerStyle={{
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        height: 35,
      }}
      inputStyle={{
        fontSize: 15,
      }}
      leftIcon={
        <MaterialIcons
          name="alternate-email"
          size={20}
          color="#666"
          style={{marginRight: 5}}
        />
      }
      placeholderTextColor={"#c4c4c4"}
      keyboardType='email-address'
      errorMessage={props.errorMessage}
    />
  );
};
AppInput.Email = EmailInput;

const SecureInput = (props) => {
  const [pass_visible, set_pass_visible] = React.useState(false);

  return (
    <Input 
      value={props.value}
      onChangeText={props.onChangeText}
      placeholder={props.placeholder || 'Password'}
      containerStyle={{
        width: '100%',
        paddingHorizontal: 0,
      }}
      inputContainerStyle={{
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        height: 35,
      }}
      inputStyle={{
        fontSize: 15,
      }}
      placeholderTextColor={"#c4c4c4"}
      leftIcon={
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#666"
          style={{marginRight: 5}}
        />
      }
      rightIcon={
        <Ionicons
          name={pass_visible? "eye-off-outline": "eye-outline"}
          size={20}
          color="#666"
          style={{marginRight: 5}}
          onPress={() => set_pass_visible(!pass_visible)}
        />
      }
      secureTextEntry={!pass_visible}
      errorMessage={props.errorMessage}
    />
  );
};
AppInput.Secure = SecureInput;

const NameInput = (props) => {
  return(
    <Input 
      value={props.value}
      onChangeText={props.onChangeText}
      placeholder={props.placeholder || 'Name'}
      containerStyle={{
        width: '100%',
        paddingHorizontal: 0,
      }}
      inputContainerStyle={{
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        height: 35,
      }}
      inputStyle={{
        fontSize: 15,
      }}
      leftIcon={
        <MaterialIcons
          name="person-outline"
          size={20}
          color="#666"
          style={{marginRight: 5}}
        />
      }
      placeholderTextColor={"#c4c4c4"}
      errorMessage={props.errorMessage}
    />
  );
};
AppInput.Name = NameInput;

const CategoryInput = props => {
  return(
    <Input 
      value={props.value}
      onChangeText={props.onChangeText}
      placeholder={props.placeholder || 'Name'}
      containerStyle={{
        width: '100%',
        paddingHorizontal: 0,
      }}
      inputContainerStyle={{
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        height: 35,
      }}
      inputStyle={{
        fontSize: 15,
      }}
      leftIcon={
        <MaterialIcons
          name="person-outline"
          size={20}
          color="#666"
          style={{marginRight: 5}}
        />
      }
      placeholderTextColor={"#c4c4c4"}
      errorMessage={props.errorMessage}
    />
  );
};
AppInput.Category = CategoryInput;

export {AppInput};
