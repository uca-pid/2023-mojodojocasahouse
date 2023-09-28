import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { styles } from './style';
import ExpenseModal from './ExpenseModal'; // Import the ExpenseModal component
import SessionContext from '../../context/SessionContext';


const Table = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const {sessionCookie, setSessionCookie} = React.useContext(SessionContext);
  const [loading, setLoading] = useState(true);



  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const fetchExpensesList = async () => {
    setLoading(true);
    let response = await fetch("http://localhost:8080/getMyExpenses", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    }).then(res => res.json());

    if(!response.error){
      setExpenses(response);
    }
    setLoading(false);
  };

  const postExpenseToApi = async (newExpense) => {
    let response = await fetch("http://localhost:8080/addExpense", {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(newExpense)
    }).then(res => res.json());

    console.log(response);

    if(response.error){
      console.error("Error posting new expense to api");
    }
  };

  const handleSaveExpense = async (newExpense) => {
    toggleModal(); // Close the modal after saving
    await postExpenseToApi(newExpense);
    await fetchExpensesList();
  };

  // fetch expenses on screen change
  React.useEffect(() => {fetchExpensesList()},[navigation]);

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
              <Text style={styles.cell}>{item.concept}</Text>
              <Text style={styles.cell}>{item.amount}</Text>
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