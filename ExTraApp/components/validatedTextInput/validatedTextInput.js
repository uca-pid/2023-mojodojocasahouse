import React from 'react';
import { View } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

/** 
 * Takes three props: ```label```, ```value```, ```onChangeText```, ```hasErrorCallback```, ```validationErrorMessage```.
 * Once user has finished editing input, an error check is done, calling hasErrorCallback(input).
 * If an error is found, validationErrorMessage is displayed.
 * 
 * @param {string} label Shown label
 * @param {string} value React state variable that holds field value
 * @param {string} validationErrorMessage Error message to show user if field has error
 * @param {function} onChangeText React state callback to update React state variable value
 * @param {function} hasErrorCallback Custom callback to detect if field has undesired errors
*/
const ValidatedTextInput = props => {

  const [error, setError] = React.useState(false);

  const onEndEditing = () => {
    let hasError = props.hasError(props.value);
    setError(hasError);
  }
  
  return (
    <View style={props.style.container? props.style.container : null}>

      <TextInput
        style={props.style.input ? props.style.input : { marginLeft: '10%', width: '80%', marginBottom: '5%' }}
        label={props.label}
        value={props.value}
        onChangeText={props.onChangeText}
        onEndEditing={onEndEditing}
        maxLength={props.maxLength}
        keyboardType={props.keyboardType}
      />

      <HelperText type="error" style={props.style.helperText ? props.style.helperText : null} visible={error}>
        {props.validationErrorMessage? props.validationErrorMessage : "Input validation error"}
      </HelperText>

    </View>
  );
};

export default ValidatedTextInput;
