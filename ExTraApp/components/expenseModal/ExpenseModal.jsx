// ExpenseModal.js
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import ValidatedTextInput from '../validatedTextInput/validatedTextInput';
import styles from './style';
import Icon from 'react-native-vector-icons/Entypo';
import RNPickerSelect from 'react-native-picker-select';

const getIcon = (category) => {
  switch(category){
    case "travel":
      return 1;
    case "food":
      return 2;
    case "housing":
      return 3;
    case "shopping":
      return 4;
    case "entertainment":
      return 5;
    case "health":
      return 6;
    case "clothes":
      return 7;
    case "education":
      return 8;
    case "various":
      return 9;
  }
};

const ExpenseModal = ({ isVisible, onClose, onSave }) => {
  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState(null);
  const [iconId, setIconId] = useState(null);
  const [open, setOpen] = useState(false);

  const checkErrors = () => {
    if (checkConceptError() || checkAmountError() || checkCategoryError()){
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

  const checkCategoryError = () => {
    return category == null;
  };

  const handleSave = () => {
    try{
      checkErrors();
      onSave({ concept, amount, date, category, iconId });
      setConcept('');
      setAmount(null);
      setDate(new Date());
      onClose();
    } catch (e) {
      Alert.alert("Validation error", "Please check fields and try again");
    }
  };

  const handleCancel = () => {
    setConcept('');
    setAmount(null);
    setDate(new Date());
    onClose();
  };

  const categoryList = [
    { label: 'Travel', value: 'travel', inputLabel: 'Category: Travel'},
    { label: 'Food', value: 'food', inputLabel: 'Category: Food'},
    { label: 'Housing', value: 'housing', inputLabel: 'Category: Housing'},
    { label: 'Shopping', value: 'shopping', inputLabel: 'Category: Shopping'},
    { label: 'Entertainment', value: 'entertainment', inputLabel: 'Category: Entertainment'},
    { label: 'Health', value: 'health', inputLabel: 'Category: Health'},
    { label: 'Clothes', value: 'clothes', inputLabel: 'Category: Clothes'},
    { label: 'Education', value: 'education', inputLabel: 'Category: Education'},
    { label: 'Various', value: 'various', inputLabel: 'Category: Various'},
  ];

  return (
    <Modal visible={isVisible} onRequestClose={onClose} transparent >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          
          <Text style={styles.modalTitle}>Add Expense</Text>

          <ValidatedTextInput
            label="Concept"
            value={concept}
            onChangeText={(text) => setConcept(text)}
            validationErrorMessage="Concept may only contain letters or numbers"
            maxLength={100}
            hasError={checkConceptError}
            style={styles.validatedTextInput}
          />

          <ValidatedTextInput
            value={amount}
            label="Amount"
            onChangeText={(text) => setAmount(text)}
            keyboardType="numeric"
            validationErrorMessage="Amount must be positive and limited to cent precision"
            hasError={checkAmountError}
            style={styles.validatedTextInput}
            maxLength={12}
          />

          <Icon.Button 
            onPress={() => {setOpen(true)}} 
            backgroundColor="#ffffff"
            color="black"
            name="calendar"
            style={styles.dateButton}
          >
            {date.toDateString()}
          </Icon.Button>

          <DatePicker
            modal={true}
            mode='date'
            open={open}
            date={date}
            onConfirm={(date) => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {setOpen(false)}}
          />

          <RNPickerSelect 
            style={styles.rnPickerSelect}
            onValueChange={(cat) => {setCategory(cat);setIconId(getIcon(cat))}}
            placeholder={{ label: 'Pick a category', value: null }}
            items={categoryList}
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