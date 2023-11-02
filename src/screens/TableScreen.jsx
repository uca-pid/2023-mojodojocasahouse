import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AddExpenseModal from '../components/AddExpenseModal';
import { postExpenseToApi, fetchUserCategories, postEditExpenseToApi,fetchExpensesList, deleteExpense} from '../utils/apiFetch';
import { ListItem, Button, Icon as MaterialIcon } from '@rneui/themed';
import { AuthContext } from '../context/AuthContext';
import FilterModal from '../components/FilterModal';
import EditExpenseModal from '../components/EditExpenseModal';
import ScreenTemplate from '../components/ScreenTemplate';



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
    <ScreenTemplate loading={loading}>
      <ScreenTemplate.Logo/>

      <ScreenTemplate.Content>
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
      </ScreenTemplate.Content>
      
      <AddExpenseModal isVisible={isModalVisible} onClose={toggleModal} onSave={handleSaveExpense} />
      <FilterModal visible={isFilterModalVisible} data={categories} onDone={handleFilterModalSubmit} onCancel={toggleFilterModal} />
      <EditExpenseModal isVisible={isEditModalVisible} onClose={() => setEditModalVisible(false)} onSave={handleSaveEditExpense} selectedExpense={selectedExpense}/>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({

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

});

export default TableScreen;