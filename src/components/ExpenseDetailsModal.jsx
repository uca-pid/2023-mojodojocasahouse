import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { fetchSharedExpenseStatus, removeSharedUser  } from "../utils/apiFetch"; // Import fetch function

const ExpenseDetailsModal = ({
  visible,
  onClose,
  onRefresh,
  expenseDetails,
  onSendShareRequest,
}) => {
  const [email, setEmail] = useState("");
  const [sharedStatuses, setSharedStatuses] = useState([]);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState("");
  const isOwner = expenseDetails?.isOwner; // Check ownership

  const handleClose = () => {
    onClose();   
    onRefresh(); 
  };

  // Fetch shared expense statuses when the modal is opened
  useEffect(() => {
    if (visible && expenseDetails?.id) {
      const fetchStatuses = async () => {
        const data = await fetchSharedExpenseStatus(expenseDetails.id);
        if (data) {
          setSharedStatuses(data.userStatuses || []);
  
          // Extract the logged-in user's email from the API response
          const currentUser = data.userStatuses.find(
            (user) => user.status !== "Owner" && user.email
          );
          if (currentUser) {
            setLoggedInUserEmail(currentUser.email);
          }
        }
      };
      fetchStatuses();
    }
  }, [visible, expenseDetails]);

  const handleShareExpense = () => {
    if (!email) {
      Alert.alert("Error", "Please enter an email address.");
      return;
    }
    onSendShareRequest(email);
    setEmail(""); // Clear the input field after sending
  };

  const handleRemoveSharedUser = (userEmail) => {
    Alert.alert(
      "Confirm Removal",
      `Are you sure you want to stop sharing this expense?`,
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            const response = await removeSharedUser(expenseDetails.id, userEmail);
            if (response) {
              Alert.alert("Success", "User removed successfully.");
              handleClose();
              setSharedStatuses((prev) =>
                prev.filter((user) => user.email !== userEmail)
              );
            } else {
              Alert.alert("Error", "Failed to remove shared user.");
            }
          },
        },
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{expenseDetails?.concept || ""}</Text>
          <Text style={styles.amount}>
            Amount: ${expenseDetails?.amount?.toFixed(2) || 0}
          </Text>

          {/* Shared Users Section */}
          <Text style={styles.sectionTitle}>Shared Users:</Text>
          <FlatList
  data={sharedStatuses}
  keyExtractor={(item) => item.email}
  renderItem={({ item }) => (
    <View style={styles.sharedUserContainer}>
      <Text style={styles.sharedUserEmail}>{item.email}</Text>
      <View style={styles.statusContainer}>
        <Text style={styles.sharedUserStatus}>
          {item.status === "Owner" ? "Owner (Creator)" : item.status}
        </Text>

        {/* Only show ONE remove button per user */}
        {isOwner && item.status !== "Owner" ? (
          <TouchableOpacity onPress={() => handleRemoveSharedUser(item.email)}>
            <Text style={styles.removeIcon}> ❌ </Text>
          </TouchableOpacity>
        ) : item.status === "Accepted" && item.email === loggedInUserEmail ? (
          <TouchableOpacity onPress={() => handleRemoveSharedUser(item.email)}>
            <Text style={styles.removeIcon}> ❌ </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  )}
  ListEmptyComponent={
    <Text style={styles.emptyText}>
      This expense is not shared with anyone yet.
    </Text>
  }
/>


          {/* Input for Sharing Expense */}
          {isOwner && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter email to share with"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
              />
              <TouchableOpacity
                style={styles.shareButton}
                onPress={handleShareExpense}
              >
                <Text style={styles.shareButtonText}>Share Expense</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  amount: {
    fontSize: 16,
    marginBottom: 20,
    color: "black",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  sharedUserContainer: {
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 5,
  },
  sharedUserEmail: {
    fontSize: 14,
    color: "black",
  },
  sharedUserStatus: {
    fontSize: 14,
    color: "gray",
  },
  emptyText: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginVertical: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    color: "black",
  },
  shareButton: {
    backgroundColor: "#e86dc3",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  shareButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 14,
    color: "white",
  },

  sharedUserContainer: {
    flexDirection: "column", // Stack email and status on top of each other
    marginBottom: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  sharedUserEmail: {
    fontSize: 14,
    color: "black",
    marginBottom: 4, // Space between email and status
  },
  statusContainer: {
    flexDirection: "row", // Keep status and ❌ on the same line
    alignItems: "center",
  },
  sharedUserStatus: {
    fontSize: 14,
    color: "gray",
    marginRight: 8,
  },
  removeIcon: {
    fontSize: 18,
    color: "red",
  },
  
});

export default ExpenseDetailsModal;
