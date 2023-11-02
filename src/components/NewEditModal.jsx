// ExpenseModal.js
import React from 'react';
import { View, Text, Modal, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import ValidatedTextInput from './ValidatedTextInput';
import styles from './style';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-date-picker';


const NewEditModal = ({ isVisible, onClose, onSave, selectedExpense }) => {
  const [concept, setConcept] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setConcept(selectedExpense.concept);
    setAmount(selectedExpense.amount + "");
    setDate(selectedExpense.date? new Date(selectedExpense.date) : new Date);
  }, [selectedExpense]);

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
        date
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
    setDate(new Date());
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
            maximumDate={new Date()}
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    display: 'flex',
    flexDirection: 'column',

    width: '90%',
    height: '75%',

    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
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
    borderColor: 'black',
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
    borderColor: 'black',
    borderWidth: 1, 
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewEditModal;