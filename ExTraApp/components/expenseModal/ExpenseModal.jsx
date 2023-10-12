// ExpenseModal.js
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Alert, ScrollView  } from 'react-native';
import DatePicker from 'react-native-date-picker';
import ValidatedTextInput from '../validatedTextInput/validatedTextInput';
import styles from './style';
import Icon from 'react-native-vector-icons/Entypo';

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
    case "Set custom category":
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
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const checkErrors = () => {
    if (checkConceptError() || checkAmountError() || checkCategoryError()) {
      throw new Error();
    }

    if(category == "Set custom category" && checkCustomCategoryError()){
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
        category: (category=='Set custom category'? formatCustomCategory(customCategory): category), 
        iconId
      });
      setConcept('');
      setAmount(null);
      setDate(new Date());
      setCategory(null);
      setIconId(null);
      setCustomCategory(null);
      onClose();
    } catch (e) {
      Alert.alert('Validation error', 'Please check fields and try again');
    }
  };

  const handleCancel = () => {
    setConcept('');
    setAmount(null);
    setDate(new Date());
    setCategory(null);
    setIconId(null);
    setCustomCategory(null);
    onClose();
  };

  const categoryList = [
    'Travel',
    'Food',
    'Housing',
    'Shopping',
    'Entertainment',
    'Health',
    'Clothes',
    'Education',
    'Various',
    'Set custom category'
  ];

  const selectCategory = (selectedCategory) => {
    setCategory(selectedCategory);
    setIconId(getIcon(selectedCategory));
    setShowCategoryModal(false);
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

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => setShowCategoryModal(true)}
          >
            <Text style={styles.categoryButtonText}>
              {category ? category : 'Select a category'}
            </Text>
          </TouchableOpacity>

          <Modal
            transparent={true}
            animationType="slide"
            visible={showCategoryModal}
          >
            <View style={styles.categoryModal}>
              <Text style={styles.modalTitle}>Select a Category</Text>
              <ScrollView style={styles.categoryList}>
                {categoryList.map((cat, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => selectCategory(cat)}
                  >
                    <Text style={styles.categoryListItem}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.categoryCancelButton}
                onPress={() => setShowCategoryModal(false)}
              >
                <Text style={styles.categoryCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          { category == 'Set custom category' ? 
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