import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView, Alert, Modal, } from 'react-native';
import { fetchWithTimeout } from '../../utils/fetchingUtils';
import { styles } from './style';
import ExpenseModal from '../../components/expenseModal/ExpenseModal';
import SettingModal from '../../components/settingsModal/settingsModal';
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from '../../components/loading/loading';
import Icon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';

const IconFactory = (props) => {
  switch (props.id) {
    case 1:
      return <Icon name="aircraft" style={props.style} />;
    case 2:
      return <Icon name="drink" style={props.style} />;
    case 3:
      return <Icon name="key" style={props.style} />;
    case 4:
      return <Icon name="shopping-cart" style={props.style} />;
    case 5:
      return <Icon name="clapperboard" style={props.style} />;
    case 6:
      return <Icon name="squared-cross" style={props.style} />;
    case 7:
      return <Icon name="man" style={props.style} />;
    case 8:
      return <Icon name="open-book" style={props.style} />;
    default:
      return <Icon name="help" style={props.style} />;
  }
};

const Table = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalSettingVisible, setModalSettingVisible] = useState(false);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleSettingModal = () => {
    setModalSettingVisible(!isModalSettingVisible);
  };

  const toggleCategoryModal = () => {
    setCategoryModalVisible(!isCategoryModalVisible);
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

  const fetchUserCategories = async () => {
    let response = await fetchWithTimeout("http://localhost:8080/getAllCategories", {
      method: "GET",
      credentials: "include",
    });
    let responseBody = await response.json();

    // OK
    if(response.ok){
      setCategories(responseBody);
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

  const fetchExpensesByCategory = async (categoryFilter) => {
    setLoading(true);
    try{

      if(categoryFilter == null){
        await fetchExpensesList();
        setLoading(false);
        return;
      }

      let response = await fetchWithTimeout("http://localhost:8080/getMyExpensesByCategory", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: categoryFilter
        })
      });
      let responseBody = await response.json();
      setLoading(false);

      // OK
      if(response.ok){
        setExpenses(responseBody);
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
      setExpenses(responseBody);
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

  const formatCategoryItem = (item) => {
    let formattedItemLabel = item.replaceAll("-", " ");
    formattedItemLabel = [...formattedItemLabel][0].toUpperCase() + [...formattedItemLabel].slice(1).join('');
    return {
      label: formattedItemLabel,
      value: item,
      inputLabel: "Category: " + formattedItemLabel
    };
  };

  const handleSaveExpense = async (newExpense) => {
    toggleModal(); // Close the modal after saving
    try {
      setLoading(true);
      await postExpenseToApi(newExpense);
      await fetchExpensesList();
      await fetchUserCategories();
      setLoading(false);

    } catch (error) {
      setLoading(false);
      Alert.alert("Connection Error", "There was an error connecting to API");
    }
  };

  const handleFocusScreen = async () => {
    await fetchUserCategories();
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

  const handleCategorySelection = (selectedCategory) => {
    // setCategoryFilter(selectedCategory);
    toggleCategoryModal();
    fetchExpensesByCategory(selectedCategory);
  };

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
            <Icon.Button onPress={postLogout} backgroundColor="#d15c54" name="log-out">Logout</Icon.Button>
          </View>
        </View>


        <View style={styles.addExpenseButtonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleModal}>
            <Text style={styles.buttonText}>Add Expense</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={toggleCategoryModal}>
          <Text style={styles.buttonText}>Select Category</Text>
        </TouchableOpacity>
        <Modal
          visible={isCategoryModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={toggleCategoryModal}>
          <View style={styles.categoryModalContainer}>
            <ScrollView>
              <TouchableOpacity onPress={() => handleCategorySelection(null)}>
                <Text style={styles.categorySelectionPicker} >All</Text>
              </TouchableOpacity>
              {categories.map((item) => (
                <TouchableOpacity
               
                  key={item}
                  onPress={() => handleCategorySelection(item)}
                >
                  <Text  style={styles.categorySelectionPicker}>{formatCategoryItem(item).label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>

        <ScrollView contentContainerStyle={styles.scrollviewContentContainer}>
          <View style={styles.tableContainer}>

            { expenses.map((item) => (
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
            ))}
          </View>
        </ScrollView>
      </View>
      <ExpenseModal isVisible={isModalVisible} onClose={toggleModal} onSave={handleSaveExpense} />
      <SettingModal isVisible={isModalSettingVisible} onSettingClose={toggleSettingModal} navigation={navigation} /> 
    </View>
  );
};

export default Table;