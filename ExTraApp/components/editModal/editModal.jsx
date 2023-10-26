// ExpenseModal.js
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Alert  } from 'react-native';
import DatePicker from 'react-native-date-picker';
import ValidatedTextInput from '../validatedTextInput/validatedTextInput';
import styles from './style';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Picker } from '../picker/picker';
import { Input, Icon } from '@rneui/themed';

const getIcon = (category) => {
  switch(category){
    case "Travel":
      return 1;
    case "Food":
      return 2;
    case "Housing":
      return 3;
    case "Shopping":
      return 4;
    case "Entertainment":
      return 5;
    case "Health":
      return 6;
    case "Clothes":
      return 7;
    case "Education":
      return 8;
    case "Various":
      return 9;
    case "Custom":
      return 10;
  }
};

const ExpenseModal = ({ isVisible, onClose, onSave }) => {
  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState(null);
  const [customCategory, setCustomCategory]= useState('');
  const [open, setOpen] = useState(false);
  const [custIcon, setCustIcon] = useState({value: 0, iconName: 'credit', iconType: 'entypo'});
  const [isIconPickerVisible, setIconPickerVisible] = useState(false);

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
    setCustIcon({value: 0, iconName: "credit", iconType: "entypo"})
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

export default ExpenseModal;