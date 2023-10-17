// ExpenseModal.js
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Alert  } from 'react-native';
import DatePicker from 'react-native-date-picker';
import ValidatedTextInput from '../validatedTextInput/validatedTextInput';
import styles from './style';
import Icon from 'react-native-vector-icons/Entypo';
import { Picker } from '../picker/picker';

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
    case "custom":
      return 10;
  }
};

const ExpenseModal = ({ isVisible, onClose, onSave }) => {
  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState(null);
  const [customCategory, setCustomCategory]= useState('');
  const [iconId, setIconId] = useState(null);
  const [open, setOpen] = useState(false);

  const checkErrors = () => {
    if (checkConceptError() || checkAmountError() || checkCategoryError()) {
      throw new Error();
    }

    if(category == "custom" && checkCustomCategoryError()){
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

  const checkCustomCategoryError = () => {
    let regex = /^[A-Za-z\d\s]+$/;
    return !regex.test(customCategory);
  };

  const formatCustomCategory = (custCat) => {
    if(custCat != null){
      var resp = custCat.toLowerCase().replaceAll(' ', '-')
    }
    else{
      return custCat;
    }
    return resp;
  };

  const handleSave = () => {
    try {
      console.log({ concept, amount, date, category, iconId })
      checkErrors();
      onSave({ 
        concept, 
        amount, 
        date, 
        category: (category=='custom'? formatCustomCategory(customCategory): category), 
        iconId
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
    setConcept('');
    setAmount(null);
    setDate(new Date());
    setCategory(null);
    setIconId(null);
    setCustomCategory(null);
  };

  const categories = [
    {value: 'travel', label: 'Travel', inputLabel: 'Category: Travel'},
    {value: 'food', label: 'Food', inputLabel: 'Category: Food'},
    {value: 'housing', label: 'Housing', inputLabel: 'Category: Housing'},
    {value: 'shopping', label: 'Shopping', inputLabel: 'Category: Shopping'},
    {value: 'entertainment', label: 'Entertainment', inputLabel: 'Category: Entertainment'},
    {value: 'health', label: 'Health', inputLabel: 'Category: Health'},
    {value: 'clothes', label: 'Clothes', inputLabel: 'Category: Clothes'},
    {value: 'education', label: 'Education', inputLabel: 'Category: Education'},
    {value: 'various', label: 'Various', inputLabel: 'Category: Various'},
    {value: 'custom', label: 'Custom', inputLabel: 'Custom category'},
  ];

  const setIcon = () => {
    setIconId(getIcon(category));
  };

  return (
    <Modal visible={isVisible} onRequestClose={onClose} transparent>
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
            onPress={() => {
              setOpen(true);
            }}
            backgroundColor="#ffffff"
            color="black"
            name="calendar"
            style={styles.dateButton}
          >
            {date.toDateString()}
          </Icon.Button>

          <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            onConfirm={(selectedDate) => {
              setOpen(false);
              setDate(selectedDate);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />

          <Picker.Single 
            value={category}
            onChange={setCategory}
            placeholder={{value: null, label: 'Choose a category...'}}
            data={categories}
            onClose={setIcon}
          />

          { category == 'custom' ? 
            <>
              <ValidatedTextInput
                label="New Category Name"
                value={customCategory}
                onChangeText={setCustomCategory}
                maxLength={49}
                validationErrorMessage="Category can contain letters or numbers"
                hasError={checkCustomCategoryError}
                style={{ marginLeft: '10%', width: '80%', marginBottom: '5%' }}
              />
            </>
          : null}

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