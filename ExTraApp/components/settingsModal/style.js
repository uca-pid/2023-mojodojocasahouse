import { StyleSheet } from "react-native";

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

export default styles;
