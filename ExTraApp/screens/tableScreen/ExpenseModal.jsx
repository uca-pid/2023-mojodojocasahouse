// ExpenseModal.js
import React, { useState } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const ExpenseModal = ({ isVisible, onClose, onSave }) => {
  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSave = () => {
    onSave({ concept, amount, date });
    setConcept('');
    setAmount('');
    setDate('');
    onClose();
  };

  const handleCancel = () => {
    setConcept('');
    setAmount('');
    setDate('');
    onClose();
  };

  return (
    <Modal visible={isVisible} onRequestClose={onClose} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Expense</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={concept}
            onChangeText={(text) => setConcept(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Value"
            value={amount}
            onChangeText={(text) => setAmount(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Date"
            value={date}
            onChangeText={(text) => setDate(text)}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#AEB4E8',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'red',
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