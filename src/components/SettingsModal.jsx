import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const SettingsModal = ({ isVisible, onSettingClose, navigation }) => {
  const handleCancel = () => {
    onSettingClose();
  };

  const navigateToChangePassword = () => {
    navigation.navigate('ChangePassScreen'); // Navigate to the ChangePasswordScreen
    onSettingClose(); // Close the modal
  };


  return (
    <Modal visible={isVisible} onRequestClose={onSettingClose} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select an Action:</Text>
          <TouchableOpacity style={styles.saveButton} onPress={navigateToChangePassword}>
            <Text style={styles.saveButtonText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#AEB4E8',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  saveButton: {
    backgroundColor: '#ADC4C0',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#d15c54',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsModal;