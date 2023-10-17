import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { styles } from './style';
import ExpenseModal from '../../components/expenseModal/ExpenseModal';
import SettingModal from '../../components/settingsModal/settingsModal';
import LoadingOverlay from '../../components/loading/loading';
import { Picker } from '../../components/picker/picker';
import { postExpenseToApi, postLogout, fetchUserCategories, fetchExpensesByCategory,fetchExpensesList} from '../../utils/apiFetch';


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
      return <Icon name="credit" style={props.style} />;
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
      await postExpenseToApi(newExpense, navigation);
      await fetchExpensesList(setExpenses, navigation);
      await fetchUserCategories(setCategories, navigation);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      Alert.alert("Connection Error", "There was an error connecting to API");
    }
  };

  const handleFocusScreen = async () => {
    await fetchUserCategories(setCategories, navigation);
    await fetchExpensesList(setExpenses, navigation);
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    await postLogout(navigation);
    setLoading(false);
  };

  const handleGettingExpensesByCategory = async () => {
    setLoading(true);
    await fetchExpensesByCategory(selectedCategory, setExpenses, navigation);
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