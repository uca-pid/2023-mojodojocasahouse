import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AddExpenseButton = () => {
  const navigation = useNavigation();

  const handleAddExpense = () => {
    navigation.navigate("Add Expense", {
    screen: "expense-add/categories-list"
    });
  };

  return (
    <View style={styles.addExpenseButtonContainer}>
      <TouchableOpacity style={styles.button} onPress={handleAddExpense}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
    </View>
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

  button: {
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

});

export default AddExpenseButton;
