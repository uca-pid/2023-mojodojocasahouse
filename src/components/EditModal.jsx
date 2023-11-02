import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import ValidatedTextInput from './ValidatedTextInput';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Picker } from './Picker';
import { Input, Icon } from '@rneui/themed';

const EditModal = ({ isVisible, onClose, onSave }) => {
  const [amount, setAmount] = useState('');
  const [open, setOpen] = useState(false);


  const checkErrors = () => {
    if (checkAmountError()) {
      throw new Error();
    }

  };


  const checkAmountError = () => {
    let regex = /^[\d]{1,12}((\.)(\d){1,2})?$/;
    return !regex.test(amount);
  };



  const handleSave = () => {
    try {
      console.log({ amount})
      checkErrors();
      onSave({ 
        amount, 
      });
      resetFields();
      onClose();
    } catch (e) {
      Alert.alert('Validation error', 'Please check fields and try again');
    }
  };

  const handleCancel = () => {
    // Resets form fields
    resetFields();

    // Calls onClose callback
    onClose();
  };

  const resetFields = () => {
    setAmount(null);

  };


  return (
    <Modal visible={isVisible} onRequestClose={onClose} transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Expense</Text>

          <ValidatedTextInput
            value={amount}
            label="Amount"
            onChangeText={setAmount}
            keyboardType="numeric"
            validationErrorMessage="Amount must be positive and limited to cent precision"
            hasError={checkAmountError}
            style={styles.validatedTextInput}
            maxLength={12}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    display: 'flex',
    flexDirection: 'column',

    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    display: 'flex',
    flexDirection: 'column',

    width: '90%',
    height: '90%',

    backgroundColor: '#AEB4E8',
    borderRadius: 10,
    padding: 20,
  },

  categoryModal: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '50%',
    marginLeft: '10%',
    marginRight: '10%',
    backgroundColor: '#ADC4C0',
    borderRadius: 10,
    padding: 20,

  },

  categoryListItem: {
    marginTop: '2%',
    color: 'black',
  },
  
  categoryCancelButton: {
    alignSelf: 'center',
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  validatedTextInput: {
    container: {
      marginTop: 10,
    },
    input: {

    },
    helperText: {

    }
  },
  
  rnPickerSelect: {
    inputIOS: {
      display: 'flex',
      flexDirection: 'row',

      // width: '100%',
      height: '100%',
      backgroundColor: '#a0d406',

      color: 'black',
      fontSize: 14,
      fontWeight: 'bold',

    },
    placeholder: {
      color: 'black',
      fontSize: 14,
      fontWeight: 'bold',
    },
    inputAndroid: {
      display: 'flex',
      flexDirection: 'row',

      // width: '100%',
      height: '100%',
      backgroundColor: '#a0d406',

      color: 'black',
      fontSize: 14,
      fontWeight: 'bold',
    },
    viewContainer: {
      display: 'flex',
      flexDirection: 'row',

      height: 50,
      width: '100%',
      marginTop: 40,
      marginBottom: 40,
      backgroundColor: '#a0d406',

      justifyContent: 'center',
      alignItems: 'stretch',
      borderRadius: 5,
    }
  },

  dateButton: {
    backgroundColor: '#eddeed',
    height: 50,
  },  

  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,

  },
  saveButton: {
    backgroundColor: '#ADC4C0',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  saveButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#d15c54',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditModal;