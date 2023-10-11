import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, Pressable } from 'react-native';
import { fetchWithTimeout } from '../../utils/fetchingUtils';
import { styles } from './style';
import ExpenseModal from './ExpenseModal'; // Import the ExpenseModal component
import SettingModal from './settingModal'; // Import the ExpenseModal component
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from '../../components/loading/loading';
import Icon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';

const IconFactory = (props) => {
  switch(props.id){
    case 1: 
      return <Icon name="aircraft" style={props.style}/>
    case 2:
      return <Icon name="address" style={props.style}/>
    case 3:
      return <Icon name="baidu" style={props.style}/>
    case 4:
      return <Icon name="clapperboard" style={props.style}/>
    case 5:
      return <Icon name="tree" style={props.style}/>
    case 6:
      return <Icon name="shopping-cart" style={props.style}/>
    case 7:
      return <Icon name="credit" style={props.style}/>
    case 8:
      return <Icon name="drink" style={props.style}/>
    case 9:
      return <Icon name="man" style={props.style}/>
    default:
      return <Icon name="help" style={props.style}/>
  }

};

const ExampleData = [
  {id: 1,  concept: 'Example 1',  amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 1},
  {id: 2,  concept: 'Example 2',  amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 2},
  {id: 3,  concept: 'Example 3',  amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 3},
  {id: 4,  concept: 'Example 4',  amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 4},
  {id: 5,  concept: 'Example 5',  amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 5},
  {id: 6,  concept: 'Example 6',  amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 6},
  {id: 7,  concept: 'Example 7',  amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 7},
  {id: 8,  concept: 'Example 8',  amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 8},
  {id: 9,  concept: 'Example 9',  amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 9},
  {id: 10, concept: 'Example 10', amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 10},
  {id: 11, concept: 'Example 11', amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 1},
  {id: 12, concept: 'Example 12', amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 1},
  {id: 13, concept: 'Example 13', amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 1},
  {id: 14, concept: 'Example 14', amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 1},
  {id: 15, concept: 'Example 15', amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 1},
  {id: 16, concept: 'Example 16', amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 1},
  {id: 17, concept: 'Example 17', amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 1},
  {id: 18, concept: 'Example 18', amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 1},
  {id: 19, concept: 'Example 19', amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 1},
  {id: 20, concept: 'Example 20', amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 1},
  {id: 21, concept: 'Example 21', amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 1},
  {id: 22, concept: 'Example 22', amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 1},
  {id: 23, concept: 'Example 23', amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 1},
  {id: 24, concept: 'Example 24', amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 1},
  {id: 25, concept: 'Example 25', amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 1},
  {id: 26, concept: 'Example 26', amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 1},
  {id: 27, concept: 'Example 27', amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 1},
  {id: 28, concept: 'Example 28', amount: 10000.00, date: '2023-09-20', category: 'travel', iconId: 1},
];


const Table = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalSettingVisible, setModalSettingVisible] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleSettingModal = () => {
    setModalSettingVisible(!isModalSettingVisible);
  };

  const navigation = useNavigation();

  const postLogout = async () => {
    setLoading(true);
      try {
      let response = await fetchWithTimeout("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
      });

      // OK
      if(response.ok){
        setLoading(false);
        Alert.alert(
          "Logout Success", 
          "Logged out successfully",
          [{text: 'OK', onPress: () => navigation.navigate('Login')}]
        );
        return;
      }
      
      // UNAUTHORIZED
      if(response.status == 401){
        setLoading(false);
        Alert.alert(
          "Session Expired", 
          "Please log in again to continue",
          [{text: 'OK', onPress: () => navigation.navigate('Login')}]
        );
        return;
      }

      // OTHER ERROR
      let responseBody = await response.json();
      setLoading(false);
      Alert.alert("API Error", responseBody.message);

    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert("Connection Error", "There was an error connecting to API");
    }
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
      <View style={styles.contentContainer}>
        <LoadingOverlay 
          shown={loading}
        />

        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('./../../img/logo.png')} />
          </View>
        </View>

        <View style={styles.menuContainer}>
          <View style={styles.menuItemContainer}>
            <FeatherIcon.Button onPress={toggleSettingModal} backgroundColor="#D9D9d9" color="black" name="settings">Settings</FeatherIcon.Button>
          </View>
          <View style={styles.menuItemContainer}>
            <Icon.Button onPress={postLogout} backgroundColor="#FF3641" name="log-out">Logout</Icon.Button>
          </View>
        </View>

        <View style={styles.categoryFilterContainer}>
          <TouchableOpacity style={styles.categoryButton} onPress={toggleModal}>
            <Text style={styles.buttonText}>Category: {categoryFilter? categoryFilter : "Any"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.addExpenseButtonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleModal}>
            <Text style={styles.buttonText}>Add Expense</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollviewContentContainer}>
          <View style={styles.tableContainer}>

            {/* { ! expenses ? expenses.map((item) => ( */}
            { ExampleData? ExampleData.map((item) => (
              <View key={item.id} style={styles.row}>
                <View style={styles.iconContainer}>
                  <IconFactory id={item.iconId} style={styles.icon} />
                </View>
                <View style={styles.rowMiddleContainer} >
                  <View style={styles.conceptContainer}>
                    <Text style={styles.concept}>{item.concept}</Text>
                  </View>
                  <View style={styles.categoryContainer}>
                    <Text style={styles.category}>{item.category}</Text>
                  </View>
                </View>
                <View style={styles.rowLeftContainer}>
                  <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{item.amount}</Text>
                  </View>
                  <View style={styles.dateContainer}>
                    <Text style={styles.date}>{item.date}</Text>
                  </View>
                </View>
              </View>
            )) : null}
          </View>
        </ScrollView>
      </View>
      <ExpenseModal isVisible={isModalVisible} onClose={toggleModal} onSave={handleSaveExpense} />
      <SettingModal isVisible={isModalSettingVisible} onSettingClose={toggleSettingModal} navigation={navigation} /> 
    </View>
  );
};

export default Table;