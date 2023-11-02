// ExpenseModal.js
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Picker } from './Picker';
import { Icon } from '@rneui/themed';
import { AppInput } from './AppInput';

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
  const [conceptError, setConceptError] = React.useState(false);
  const [amountError, setAmountError] = React.useState(false);

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
    let isValid = regex.test(concept);
    setConceptError(!isValid);
    return !isValid;
  };

  const checkAmountError = () => {
    let regex = /^[\d]{1,12}((\.)(\d){1,2})?$/;
    let isValid = regex.test(amount);
    setAmountError(!isValid);
    return !isValid;
  };

  const checkCategoryError = () => {
    return category == null;
  };

  const checkCustomCategoryError = () => {
    let regex = /^[A-Za-z\d\s]+$/;
    let isValid = regex.test(customCategory);
    setCustomCategoryError(!isValid);
    return !isValid;
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

          <AppInput.Concept 
            value={concept}
            onChangeText={setConcept}
            onEndEditing={checkConceptError}
            errorMessage={conceptError? "Concept may only contain letters or numbers" : null}
          />

          <AppInput.Amount 
            value={amount}
            onChangeText={setAmount}
            onEndEditing={checkAmountError}
            errorMessage={amountError? "Amount must be positive and limited to cent precision" : null}
          />

          <AppInput.Date 
            value={date}
            onPress={() => setOpen(true)}
          />

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
            maximumDate={new Date()}
          />

          <Picker.Text 
            value={category}
            onChange={setCategory}
            data={categories}
            onClose={setIcon}
          />

          { category == 'Custom' ? 
            <>
              <AppInput.Category 
                value={customCategory}
                rightIcon={
                  <Icon
                    name={custIcon.iconName}
                    type={custIcon.iconType}
                    size={24}
                    color='black'
                    onPress={() => setIconPickerVisible(true)}
                  />
                }
                onChangeText={setCustomCategory}
                errorMessage={hasCustomCategoryError? "Category can contain letters or numbers" : null}
                onEndEditing={checkCustomCategoryError}
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

    backgroundColor: 'white',
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
    backgroundColor: '#E86DC3',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
    borderWidth: 1,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'grey',
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

export default ExpenseModal;