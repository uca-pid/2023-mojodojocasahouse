
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { styles } from './style';
import ExpenseModal from './ExpenseModal'; // Import the ExpenseModal component

const data = [
  { id: 1, title: 'Item 1', value: 10, date: '2023-09-13' },
  { id: 2, title: 'Item 2', value: 20, date: '2023-09-14' },
  { id: 3, title: 'Item 3', value: 30, date: '2023-09-15' },
  // Add more data as needed
];

const Table = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [expenses, setExpenses] = useState(data);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSaveExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
    toggleModal(); // Close the modal after saving
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('./../../img/logo.png')} />
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleModal}>
            <Text style={styles.buttonText}>Add Expense</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCellId}>ID</Text>
            <Text style={styles.headerCell}>Title</Text>
            <Text style={styles.headerCell}>Value</Text>
            <Text style={styles.headerCell}>Date</Text>
          </View>
          {expenses.map((item) => (
            <View key={item.id} style={styles.row}>
              <Text style={styles.cellId}>{item.id}</Text>
              <Text style={styles.cell}>{item.title}</Text>
              <Text style={styles.cell}>{item.value}</Text>
              <Text style={styles.cell}>{item.date}</Text>
            </View>
          ))}
        </View>
      </View>
      <ExpenseModal isVisible={isModalVisible} onClose={toggleModal} onSave={handleSaveExpense} />
    </View>
  );
};

export default Table;