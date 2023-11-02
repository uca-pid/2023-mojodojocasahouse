import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ExpenseModal from '../components/ExpenseModal';
import SettingModal from '../components/SettingsModal';
import { postExpenseToApi, fetchUserCategories, postEditExpenseToApi,fetchExpensesList, deleteExpense} from '../utils/apiFetch';
import { Dialog, ListItem, Button, Icon as MaterialIcon } from '@rneui/themed';
import { AuthContext } from '../context/AuthContext';
import FilterModal from '../components/FilterModal';
import EditModal from '../components/EditModal';
import NewEditModal from '../components/NewEditModal';
import {LinearGradient} from 'react-native-linear-gradient';



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
      return "squared-plus"
    case 7:
      return "man"
    case 8:
      return "open-book"
    default:
      return "credit"
  }
};

const TableScreen = () => {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isModalSettingVisible, setModalSettingVisible] = React.useState(false);
  const [isFilterModalVisible, setFilterModalVisible] = React.useState(false);
  const [isEditModalVisible, setEditModalVisible] = React.useState(false);
  const [expenses, setExpenses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [categories, setCategories] = React.useState([]);
  const navigation = useNavigation();
  const {signOut, sessionExpired} = React.useContext(AuthContext);
  const [selectedExpense, setSelectedExpense] = React.useState({});

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
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

  const handleFilterModalSubmit = async (data) => {
    setLoading(true);
    await fetchExpensesList(setExpenses, sessionExpired, data);
    setFilterModalVisible(false);
    setLoading(false);
  };

  const handleDeleteExpense = async (id) => {
    setLoading(true);
    await deleteExpense(id);
    await fetchUserCategories(setCategories, sessionExpired);
    await fetchExpensesList(setExpenses, sessionExpired);
    setLoading(false);
  };

  const handleEditExpense = async (item) => {
    setSelectedExpense(item);
    setEditModalVisible(!isModalVisible);
  };

  const handleSaveEditExpense = async (request) => {
    setLoading(true);
    try {
      await postEditExpenseToApi(request);
      await fetchExpensesList(setExpenses, sessionExpired);
      await fetchUserCategories(setCategories, sessionExpired);
      setLoading(false);
      setEditModalVisible(false); // Close the Edit Modal
    } catch (error) {
      setLoading(false);
      Alert.alert("Connection Error", "There was an error connecting to API");
    }
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
    <LinearGradient colors={['#E86DC3', 'white']} style={styles.appContainer}>
      
      <View style={styles.contentContainer}>
        <Dialog isVisible={loading}>
          <Dialog.Loading />
        </Dialog>
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('./../../img/logo.png')} />
          </View>
        </View>


        <View style={styles.addExpenseButtonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleModal}>
            <Text style={styles.buttonText}>Add Expense</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterButtonContainer}>
          <TouchableOpacity style={styles.filterButton} onPress={toggleFilterModal}>
            <Text style={styles.buttonText}>Filter</Text>
          </TouchableOpacity>
        </View>

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
                      handleEditExpense(item);
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
      <FilterModal visible={isFilterModalVisible} data={categories} onDone={handleFilterModalSubmit} onCancel={toggleFilterModal} />
      {/* <EditModal isVisible={isEditModalVisible} onClose={() => setEditModalVisible(false)} onSave={handleSaveEditExpense} /> */}
      <NewEditModal isVisible={isEditModalVisible} onClose={() => setEditModalVisible(false)} onSave={handleSaveEditExpense} selectedExpense={selectedExpense}/>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    display: 'flex',
    flexDirection: 'column',

    backgroundColor: 'white',
    height: '100%',
  },

  contentContainer: {
    display: 'flex',
    flexDirection: 'column',

    margin: "2%",
    marginTop: "6%",
    borderRadius: 14,
    backgroundColor: 'white', // Background color
    height: '96%',
    width: '96%',
  },



  // Logo Container

  headerContainer: {
    display: 'flex',
    flexDirection: 'row',

    height: 80,
    width: '100%',

    justifyContent: 'space-around',
    alignItems: 'center'
  },

  logoContainer: {
    display: 'flex',
    flexDirection: 'row',

    aspectRatio: 3.55,
    width: '65%',

    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: '100%',
    aspectRatio: 2,
    resizeMode: 'contain',
  },

  logoutButtonContainer: {
    display: 'flex',
    flexDirection: 'row',

    height: '100%',
    aspectRatio: 0.7,

    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutButton: {
    display: 'flex',
    flexDirection: 'row',

    borderRadius: 10,
    backgroundColor: '#d15c54',
    height: '70%',
    aspectRatio: 0.7,
    borderWidth: 1.5,
    borderColor: "#d15c54",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutButtonIcon: {
    fontSize: 23,
  },




  // Menu button container

  menuContainer: {
    display: 'flex',
    flexDirection: 'row',

    width: '100%',
    marginTop: 20,

    justifyContent: 'space-evenly',
  },

  menuItemContainer: {
    display: 'flex',
    flexDirection: 'row',

    width: 100,
  },






  // Bottom container

  addExpenseButtonContainer: {
    height: '5%',
    width: '90%',
    marginLeft: '5%',
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#e86dc3',
  },

  filterButtonContainer: {
    height: '5%',
    width: '90%',
    marginLeft: '5%',
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#e86dc3',
  },

  button: {
    backgroundColor: '#e86dc3',
    paddingBottom: '2.5%',
    paddingTop: '2.5%',
    alignItems: 'center',
    borderRadius: 10,
  },

  filterButton: {
    backgroundColor: '#e86dc3',
    paddingBottom: '2.5%',
    paddingTop: '2.5%',
    alignItems: 'center',
    borderRadius: 10,
  },
  
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },






  // Scrollview

  scrollviewContentContainer: {
    display: 'flex',
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: '#e1e1e8', // Table background color
    borderWidth: 1,
    borderColor: '#AEB4E7', // Border color
    borderRadius: 5,
  },

  tableContainer: {
    display: 'flex',
    margin: 16,
    backgroundColor: '#e1e1e8', // Table background color
    borderWidth: 1,
    borderColor: '#AEB4E7', // Border color
    borderRadius: 5,
  },

  
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  iconContainer: {
    display: 'flex',
    flexDirection: 'row',

    height: '100%',
    aspectRatio: 1,
    
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    display: 'flex',
    flexDirection: 'row',
    color: 'black',

    fontSize: 25,
  },

  rowMiddleContainer: {
    display: 'flex',
    flexDirection: 'column',

    width: 200, // Máximo posible
    height: '100%',

    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

  conceptContainer: {
    display: 'flex',
    flexDirection: 'row',

    width: '100%',
    height: '50%',

    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  concept: {
    display: 'flex',
    flexDirection: 'row',

    fontSize: 15,
    color: '#000000',

    textAlign: 'left',
  },

  categoryContainer: {
    display: 'flex',
    flexDirection: 'row',

    width: '100%',
    height: '50%',

    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  categoryModalContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '50%',
    marginLeft: '10%',
    marginRight: '10%',
    backgroundColor: '#ADC4C0',
    borderRadius: 10,
    padding: 20,
  },

  category: {
    display: 'flex',
    flexDirection: 'row',

    fontSize: 13,
    color: '#5c5c5c',

    textAlign: 'left',
  },

  rowLeftContainer: {
    display: 'flex',
    flexDirection: 'column',

    width: 80,
    height: '100%',

    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

  amountContainer: {
    display: 'flex',
    flexDirection: 'row',

    width: '100%',
    height: '50%',

    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  amount: {
    display: 'flex',
    flexDirection: 'row',

    fontSize: 15,
    color: '#000000',

    textAlign: 'left',
  },

  dateContainer: {
    display: 'flex',
    flexDirection: 'row',

    width: '100%',
    height: '50%',

    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  date: {
    display: 'flex',
    flexDirection: 'row',

    fontSize: 11,
    color: '#5c5c5c',

    textAlign: 'left',
  },

});

export default TableScreen;