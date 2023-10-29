import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { styles } from './style';
import ExpenseModal from '../../components/expenseModal/ExpenseModal';
import SettingModal from '../../components/settingsModal/settingsModal';
import { postExpenseToApi, fetchUserCategories, postEditExpenseToApi,fetchExpensesList, deleteExpense} from '../../utils/apiFetch';
import { Dialog, ListItem, Button, Icon as MaterialIcon } from '@rneui/themed';
import { AuthContext } from '../../context/authContext';
import FilterModal from '../../components/filterModal/filterModal';
import EditModal from '../../components/editModal/editModal';
import NewEditModal from '../../components/newEditModal/newEditModal';


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

const Table = () => {
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
    <View style={styles.appContainer}>
      
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
    </View>
  );
};

export default Table;