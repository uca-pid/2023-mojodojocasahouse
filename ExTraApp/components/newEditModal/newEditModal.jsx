// ExpenseModal.js
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Alert  } from 'react-native';
import DatePicker from 'react-native-date-picker';
import ValidatedTextInput from '../validatedTextInput/validatedTextInput';
import styles from './style';
import moment from 'moment';

import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Picker } from '../picker/picker';
import { Input, Icon } from '@rneui/themed';


const NewEditModal = ({ isVisible, onClose, onSave, selectedExpense }) => {
  console.log(selectedExpense);
  const [concept, setConcept] = useState(selectedExpense.concept + "");
  const [amount, setAmount] = useState(selectedExpense.amount + "");
  const [open, setOpen] = useState(false);

  const checkErrors = () => {
    if (checkConceptError() || checkAmountError()) {
      throw new Error();
    }
  };

  const checkConceptError = () => {
    let regex = /^[A-Za-z\d\s]+$/;
    return !regex.test(concept);
  };

  const checkAmountError = () => {
    let regex = /^[\d]{1,12}((\.)(\d){1,2})?$/;
    return !regex.test(amount);
  };


  const handleSave = () => {
    try {
      checkErrors();
      onSave({ 
        id: selectedExpense.id,
        concept, 
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
    setConcept(null);
    setAmount(null);
  };


  return (
    <Modal visible={isVisible} onRequestClose={onClose} transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Expense</Text>

          <ValidatedTextInput
            label="Concept"
            value={concept}
            onChangeText={setConcept}
            validationErrorMessage="Concept may only contain letters or numbers"
            maxLength={100}
            hasError={checkConceptError}
            style={styles.validatedTextInput}
          />

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

export default NewEditModal;