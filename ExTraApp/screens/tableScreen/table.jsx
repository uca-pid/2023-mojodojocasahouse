import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { styles } from './style';
import ExpenseModal from '../../components/expenseModal/ExpenseModal';
import SettingModal from '../../components/settingsModal/settingsModal';
import { Picker } from '../../components/picker/picker';
import { postExpenseToApi, fetchUserCategories, fetchExpensesByCategory,fetchExpensesList} from '../../utils/apiFetch';
import { Dialog, ListItem, Button, Icon as MaterialIcon } from '@rneui/themed';
import { AuthContext } from '../../context/authContext';
import FilterModal from '../../components/filterModal/filterModal';


const iconFactory = (id) => {
  switch (id) {
    case 1:
      return "aircraft"
    case 2:
      return "drink"
    case 3:
      return "key"
    case 4:
      return "shopping-cart"
    case 5:
      return "clapperboard"
    case 6:
      return "squared-cross"
    case 7:
      return "man"
    case 8:
      return "open-book"
    default:
      return "credit"
  }
};

const Table = () => {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isModalSettingVisible, setModalSettingVisible] = React.useState(false);
  const [expenses, setExpenses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [categories, setCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const navigation = useNavigation();
  const {signOut, sessionExpired} = React.useContext(AuthContext);


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleSettingModal = () => {
    setModalSettingVisible(!isModalSettingVisible);
  };


  const handleSaveExpense = async (newExpense) => {
    toggleModal(); // Close the modal after saving
    try {
      setLoading(true);
      await postExpenseToApi(newExpense, sessionExpired);
      await fetchExpensesList(setExpenses, sessionExpired);
      await fetchUserCategories(setCategories, sessionExpired);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      Alert.alert("Connection Error", "There was an error connecting to API");
    }
  };

  const handleFocusScreen = async () => {
    await fetchUserCategories(setCategories, sessionExpired);
    await fetchExpensesList(setExpenses, sessionExpired);
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  const handleGettingExpensesByCategory = async () => {
    setLoading(true);
    await fetchExpensesByCategory(selectedCategory, setExpenses, sessionExpired);
    setLoading(false);
  };

  const handleDeleteExpense = async (id) => {
    setLoading(true);
    // await postDeleteExpense(id); needs implementation
    setLoading(false);
  };

  const handleEditExpense = (id) => {
    // Open modal for deleting expense
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
      <FilterModal />
      <View style={styles.contentContainer}>
        <Dialog isVisible={loading}>
          <Dialog.Loading />
        </Dialog>

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
            <Icon.Button onPress={handleLogout} backgroundColor="#d15c54" name="log-out">Logout</Icon.Button>
          </View>
        </View>


        <View style={styles.addExpenseButtonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleModal}>
            <Text style={styles.buttonText}>Add Expense</Text>
          </TouchableOpacity>
        </View>

        <Picker.Single 
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder={{value: null, label: "Any", inputLabel: "Category: Any"}}
          data={categories}
          onClose={handleGettingExpensesByCategory}
        />

        <ScrollView style={{marginBottom: 10, marginTop: 10}} contentContainerStyle={styles.scrollviewContentContainer}>

            { expenses.map((item, index) => (
              <ListItem.Swipeable
                key={index}
                leftWidth={70}
                rightWidth={70}
                containerStyle={{borderBottomWidth: 1, }}
                leftContent={(reset) => (
                  <Button
                    containerStyle={{
                      flex: 1,
                      justifyContent: "center",
                      backgroundColor: "#f4f4f4",
                    }}
                    type="clear"
                    icon={{
                      name: "file-document-edit-outline",
                      type: "material-community",
                    }}
                    onPress={() => {
                      reset();
                      handleEditExpense(item.id);
                    }}
                  />
                )}
                rightContent={(reset) => (
                  <Button
                    containerStyle={{
                      flex: 1,
                      justifyContent: "center",
                      backgroundColor: "#d15c54",
                    }}
                    type="clear"
                    icon={{ name: "delete-outline", color: "white" }}
                    onPress={() => {
                      reset();
                      handleDeleteExpense(item.id);
                    }}
                  />
                )}
              >
                <MaterialIcon name={iconFactory(item.iconId)} type="entypo" />
                <ListItem.Content>
                  <ListItem.Title style={{fontSize: 17}} numberOfLines={1}>{item.concept}</ListItem.Title>
                  <ListItem.Subtitle style={{fontSize: 13}} numberOfLines={1}>{item.category}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content right>
                  <ListItem.Title right numberOfLines={1}>{item.amount}</ListItem.Title>
                  <ListItem.Subtitle style={{fontSize: 12}} right numberOfLines={1}>{item.date}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem.Swipeable>
            ))}
        </ScrollView>
      </View>
      <ExpenseModal isVisible={isModalVisible} onClose={toggleModal} onSave={handleSaveExpense} />
      <SettingModal isVisible={isModalSettingVisible} onSettingClose={toggleSettingModal} navigation={navigation} /> 
    </View>
  );
};

export default Table;