import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, StyleSheet } from 'react-native';
import { manageSharedExpense, fetchUserCategories, fetchExpensesList , deleteExpense} from '../utils/apiFetch';
import { ListItem, Button, Icon as MaterialIcon } from '@rneui/themed';
import { AuthContext } from '../context/AuthContext';
import FilterModal from '../components/FilterModal';
import ScreenTemplate from '../components/ScreenTemplate';
import ExpenseDetailsModal from '../components/ExpenseDetailsModal';

const iconFactory = (id) => {
  switch (id) {
    case 1: return "aircraft";
    case 2: return "drink";
    case 3: return "key";
    case 4: return "shopping-cart";
    case 5: return "clapperboard";
    case 6: return "squared-plus";
    case 7: return "man";
    case 8: return "open-book";
    default: return "credit";
  }
};

const TableScreen = ({ navigation, route }) => {
  const [isFilterModalVisible, setFilterModalVisible] = React.useState(false);
  const [expenses, setExpenses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [categories, setCategories] = React.useState([]);
  const { signOut, sessionExpired } = React.useContext(AuthContext);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const handleAddExpense = () => {
    navigation.navigate("Add Expense", {
      screen: "expense-add/categories-list"
    });
  };

  const handleDeleteExpense = async (id) => {
    setLoading(true);
    await deleteExpense(id);
    await fetchUserCategories(setCategories, sessionExpired);
    await fetchExpensesList(setExpenses, sessionExpired);
    setLoading(false);
  };

  const handleSendShareRequest = async (email) => {
    const shareExpenseData = {
      expenseId: selectedItem.id,
      actionType: 'ADD',
      userEmails: [email],
      amount: selectedItem.amount,
    };

    try {
      await manageSharedExpense(shareExpenseData, sessionExpired);
      Alert.alert('Success', `Expense shared with ${email}`);
      setSelectedItem(null);
      fetchExpensesAndCategories();
    } catch (error) {
      console.error('handleSendShareRequest', error);
      Alert.alert('Error', 'Failed to share expense.');
    }
  };

  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

  const fetchExpensesAndCategories = async () => {
    setLoading(true);
    try {
      await fetchUserCategories(setCategories, sessionExpired);
      const allExpenses = [];
      await fetchExpensesList(
        (expenses) => {
          // Deduplicate based on `id`
          const uniqueExpenses = expenses.reduce((acc, expense) => {
            if (!acc.some((item) => item.id === expense.id)) acc.push(expense);
            return acc;
          }, []);
          allExpenses.push(...uniqueExpenses);
        },
        sessionExpired
      );
      setExpenses(allExpenses);
    } catch (error) {
      console.error('fetchExpensesAndCategories', error);
      Alert.alert("Error", "Unable to fetch expenses.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterModalSubmit = async (data) => {
    console.log("Submitting filter request:", data);
    setLoading(true);
    try {
        console.log("Calling fetchExpensesList...");
        await fetchExpensesList(setExpenses, sessionExpired, data);
        console.log("fetchExpensesList finished.");
    } catch (error) {
        console.error("Error in handleFilterModalSubmit:", error);
    } finally {
        setFilterModalVisible(false);
        //setExpenses(prev => [...prev]); 
console.log("Forcing state update after closing modal.");

        setLoading(false);
    }
};
const handleEditExpense = async (item) => {
  navigation.navigate("Add Expense", {
    screen: "expense-modify/categories-list",
    params: {
      selectedCategory: {category: item.category, iconId: item.iconId},
      selectedItem: item
    },
  });
};

  const handleFocus = () => {
    fetchExpensesAndCategories();
  };

  React.useEffect(() => {
    console.log("Updated expenses state:", expenses);
    const unsubscribe = navigation.addListener('focus', handleFocus);
    handleFocus();
    return unsubscribe;
  }, [navigation]);

  return (
    <ScreenTemplate loading={loading}>
      <ScreenTemplate.Logo />

      <ScreenTemplate.Content>
        <View style={styles.addExpenseButtonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAddExpense}>
            <Text style={styles.buttonText}>Add Expense</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterButtonContainer}>
          <TouchableOpacity style={styles.filterButton} onPress={toggleFilterModal}>
            <Text style={styles.buttonText}>Filter</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ height: '70%' }} contentContainerStyle={styles.scrollviewContentContainer}>
          {expenses.map((item, index) => (
            <ListItem.Swipeable
              key={index}
              leftWidth={70}
              onPress={() => { console.log(item); setSelectedItem(item); }}
              rightWidth={70}
              containerStyle={{ borderBottomWidth: 1 }}
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
                    if (item.isOwner) {
                      handleEditExpense(item); 
                    } else {
                      Alert.alert("Error", "Only owners can edit expenses. Press on expense to see more details and then ❌ to stop sharing.");
                    }
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
                    if (item.isOwner) {
                      Alert.alert(
                        "Confirm Delete",
                        "Are you sure you want to delete this expense?",
                        [
                          { text: "Cancel", style: "cancel" },
                          { 
                            text: "Delete", 
                            onPress: async () => {
                              await handleDeleteExpense(item.id);
                              setSelectedItem(null); 
                            } 
                          },
                        ]
                      );
                    } else {
                      Alert.alert("Error", "Only owners can delete expenses. Press on expense to see more details and then ❌ to stop sharing.");
                    }
                  }}
                />
              )}
              
            >
              <MaterialIcon name={iconFactory(item.iconId)} type="entypo" />
              <ListItem.Content>
                <ListItem.Title style={{ fontSize: 17 }} numberOfLines={1}>
                  {item.concept}
                </ListItem.Title>
                <ListItem.Subtitle style={{ fontSize: 13 }} numberOfLines={1}>
                  {item.category}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Content right>
                <ListItem.Title right numberOfLines={1}>{item.amount}</ListItem.Title>
                <ListItem.Subtitle style={{ fontSize: 12 }} right numberOfLines={1}>{item.date}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem.Swipeable>
          ))}
        </ScrollView>
        <ExpenseDetailsModal
          visible={selectedItem ? true : false}
          onClose={() => setSelectedItem(null)}
          expenseDetails={selectedItem}
          onSendShareRequest={handleSendShareRequest}
          onRefresh={fetchExpensesAndCategories}
        />
      </ScreenTemplate.Content>

      <FilterModal
        visible={isFilterModalVisible}
        data={categories}
        onDone={handleFilterModalSubmit}
        onCancel={toggleFilterModal}
      />
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({

  addExpenseButtonContainer: {
    height: 35,
    width: '90%',
    marginLeft: '5%',
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#e86dc3',
  },

  filterButtonContainer: {
    height: 35,
    width: '90%',
    marginLeft: '5%',
    marginTop: 10,
    marginBottom: 10,
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


  scrollviewContentContainer: {
    display: 'flex',
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: '#e1e1e8', 
    borderWidth: 1,
    borderColor: '#AEB4E7',
    borderRadius: 5,
  },});

export default TableScreen;
