import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import styles from './style';

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

export default SettingsModal;