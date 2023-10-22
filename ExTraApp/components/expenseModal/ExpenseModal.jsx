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
  const [hasCustomCategoryError, setCustomCategoryError] = useState(false);
  const [iconId, setIconId] = useState(null);
  const [open, setOpen] = useState(false);
  const [custIcon, setCustIcon] = useState({value: 0, iconName: 'credit', iconType: 'entypo'});
  const [isIconPickerVisible, setIconPickerVisible] = useState(false);

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
    if(!regex.test(customCategory)){
      setCustomCategoryError(true);
      return true;
    }
    setCustomCategoryError(false);
    return false;
  };


  const handleSave = () => {
    try {
      console.log({ concept, amount, date, category, iconId })
      checkErrors();
      onSave({ 
        concept, 
        amount, 
        date, 
        category: (category=='Custom'? customCategory: category), 
        iconId: (category=='Custom'? custIcon.value : iconId)
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
    setCustIcon({value: 0, iconName: "credit", iconType: "entypo"})
  };

  const categories = [
    "Travel",
    "Food",
    "Housing",
    "Shopping",
    "Entertainment",
    "Health",
    "Clothes",
    "Education",
    "Various",
    "Custom"
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

          <EntypoIcon.Button
            onPress={() => {
              setOpen(true);
            }}
            backgroundColor="#ffffff"
            color="black"
            name="calendar"
            style={styles.dateButton}
          >
            {date.toDateString()}
          </EntypoIcon.Button>

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

          <Picker.Text 
            value={category}
            onChange={setCategory}
            data={categories}
            onClose={setIcon}
          />

          { category == 'Custom' ? 
            <>
              <Input
                placeholder='Category name'
                rightIcon={
                  <Icon
                    name={custIcon.iconName}
                    type={custIcon.iconType}
                    size={24}
                    color='black'
                    onPress={() => setIconPickerVisible(true)}
                  />
                }
                value={customCategory}
                onChangeText={setCustomCategory}
                errorMessage={hasCustomCategoryError? "Category can contain letters or numbers" : null}
                onEndEditing={checkCustomCategoryError}
                inputContainerStyle={{backgroundColor: 'white', padding: 3, borderRadius: 2}}
              />

              <Picker.Icon 
                visible={isIconPickerVisible}
                value={custIcon}
                onChange={setCustIcon}
                onDone={() => setIconPickerVisible(false)}
                onCancel={() => setIconPickerVisible(false)}
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