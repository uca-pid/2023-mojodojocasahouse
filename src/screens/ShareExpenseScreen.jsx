import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { ListItem, Button } from '@rneui/themed';
import { fetchPendingSharedExpenses, respondToSharedExpense } from '../utils/apiFetch';
import { AuthContext } from '../context/AuthContext';
import ScreenTemplate from '../components/ScreenTemplate';

const ShareExpenseScreen = () => {
  const [pendingExpenses, setPendingExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { sessionExpired } = useContext(AuthContext);

  const fetchExpenses = async () => {
    setLoading(true);
    await fetchPendingSharedExpenses(setPendingExpenses, sessionExpired);
    setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleResponse = async (expenseId, status) => {
    const responseData = { status }; // "Accepted" or "Rejected"

    try {
      console.log("Expense ID: " + expenseId);
      await respondToSharedExpense(expenseId, responseData, sessionExpired);
      fetchExpenses(); // Refresh the pending expenses list
    } catch (error) {
      console.error("Error responding to shared expense:", error);
      Alert.alert("Error", "Unable to respond to the shared expense.");
    }
  };

  const renderExpenseItem = ({ item }) => (
    <ListItem containerStyle={styles.listItem}>
      <ListItem.Content>
        <ListItem.Title>{item.concept}</ListItem.Title>
        <ListItem.Subtitle>
          Amount: {item.amount} | Owner: {item.ownerName} ({item.ownerEmail}) | Category: {item.category}
        </ListItem.Subtitle>
      </ListItem.Content>
      <View style={styles.actionButtons}>
        <Button
          title="Accept"
          onPress={() => handleResponse(item.sharedExpenseId, "Accepted")}
          buttonStyle={styles.acceptButton}
        />
        <Button
          title="Refuse"
          onPress={() => handleResponse(item.sharedExpenseId, "Rejected")}
          buttonStyle={styles.refuseButton}
        />
      </View>
    </ListItem>
  );

  return (
    <ScreenTemplate loading={loading}>
      <ScreenTemplate.Logo />

      <ScreenTemplate.Content>
        <Text style={styles.headerText}>Pending Shared Expenses</Text>
        {pendingExpenses.length > 0 ? (
          <FlatList
            data={pendingExpenses}
            keyExtractor={(item) => item.sharedExpenseId.toString()}
            renderItem={renderExpenseItem}
          />
        ) : (
          <Text style={styles.noExpensesText}>No pending shared expenses at the moment.</Text>
        )}
      </ScreenTemplate.Content>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  noExpensesText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginTop: 20,
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    marginRight: 10,
  },
  refuseButton: {
    backgroundColor: '#F44336',
  },
});

export default ShareExpenseScreen;
