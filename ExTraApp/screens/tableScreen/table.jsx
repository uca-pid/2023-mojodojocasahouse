import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { fetchWithTimeout } from '../../utils/fetchingUtils';
import { styles } from './style';
import ExpenseModal from './ExpenseModal'; // Import the ExpenseModal component
import LoadingOverlay from '../../components/loading/loading';


const Table = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const fetchExpensesList = async () => {
    let response = await fetchWithTimeout("http://localhost:8080/getMyExpenses", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    });
    let responseBody = await response.json();

    // OK
    if(response.ok){
      setExpenses(response);
      return;
    }
    
    // UNAUTHORIZED
    if(response.status == 401){
      Alert.alert(
        "Session Expired", 
        "Please log in again to continue",
        [{text: 'OK', onPress: () => navigation.navigate('Login')}]
      );
      return;
    }

    // OTHER ERROR
    Alert.alert("API Error", responseBody.message);
  };

  const postExpenseToApi = async (newExpense) => {
    let response = await fetchWithTimeout("http://localhost:8080/addExpense", {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(newExpense)
    });
    let responseBody = await response.json();

    // OK
    if(response.ok){
      Alert.alert("Success", "Expense added successfully!");
      return;
    }

    // UNAUTHORIZED
    if(response.status == 401){
      Alert.alert(
        "Session Expired", 
        "Please log in again to continue",
        () => navigation.navigate('Login')
      );
      return;
    }

    // OTHER ERROR
    Alert.alert("API Error", responseBody.message);
  };

  const handleSaveExpense = async (newExpense) => {
    toggleModal(); // Close the modal after saving
    try {
      setLoading(true);
      await postExpenseToApi(newExpense);
      await fetchExpensesList();
      setLoading(false);

    } catch (error) {
      setLoading(false);
      Alert.alert("Connection Error", "There was an error connecting to API");
    }
  };

  const handleFocusScreen = async () => {
    await fetchExpensesList();
    setLoading(false);
  };


  React.useEffect(() => {
    try{
      setLoading(true);
      handleFocusScreen();
    } catch (error) {
      setLoading(false);
      Alert.alert("Connection Error", "There was an error connecting to API");
    }
  },[navigation]);

  return (
    <View style={styles.appContainer}>
      <View style={styles.container}>
        <LoadingOverlay 
          shown={loading}
        />
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
            <Text style={styles.headerCell}>Concept</Text>
            <Text style={styles.headerCell}>Category</Text>
            <Text style={styles.headerCell}>Value</Text>
            <Text style={styles.headerCell}>Date</Text>
          </View>
          {! expenses ? expenses.map((item) => (
            <View key={item.id} style={styles.row}>
              <Text style={styles.cell}>{item.concept}</Text>
              <Text style={styles.cell}>{item.category}</Text>
              <Text style={styles.cell}>{item.amount}</Text>
              <Text style={styles.cell}>{item.date}</Text>
            </View>
          )) : null}
        </View>
      </View>
      <ExpenseModal isVisible={isModalVisible} onClose={toggleModal} onSave={handleSaveExpense} />
    </View>
  );
};

export default Table;