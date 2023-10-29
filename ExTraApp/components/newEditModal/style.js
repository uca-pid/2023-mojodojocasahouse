import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    modalBackground: {
      display: 'flex',
      flexDirection: 'column',

      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },

    modalContainer: {
      display: 'flex',
      flexDirection: 'column',

      width: '90%',
      height: '75%',

      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'black',
      padding: 20,
    },

    categoryModal: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '50%',
      marginLeft: '10%',
      marginRight: '10%',
      backgroundColor: '#ADC4C0',
      borderRadius: 10,
      padding: 20,

    },

    categoryListItem: {
      marginTop: '2%',
      color: 'black',
    },
    
    categoryCancelButton: {
      alignSelf: 'center',
    },

    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },

    validatedTextInput: {
      container: {
        marginTop: 10,
      },
      input: {

      },
      helperText: {

      }
    },
    
    rnPickerSelect: {
      inputIOS: {
        display: 'flex',
        flexDirection: 'row',
  
        // width: '100%',
        height: '100%',
        backgroundColor: '#a0d406',
  
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
  
      },
      placeholder: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
      },
      inputAndroid: {
        display: 'flex',
        flexDirection: 'row',
  
        // width: '100%',
        height: '100%',
        backgroundColor: '#a0d406',
  
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
      },
      viewContainer: {
        display: 'flex',
        flexDirection: 'row',
  
        height: 50,
        width: '100%',
        marginTop: 40,
        marginBottom: 40,
        backgroundColor: '#a0d406',
  
        justifyContent: 'center',
        alignItems: 'stretch',
        borderRadius: 5,
      }
    },

    dateButton: {
      backgroundColor: '#eddeed',
      height: 50,
    },  

    input: {
      backgroundColor: 'white',
      borderRadius: 5,
      marginBottom: 10,
  
    },
    saveButton: {
      backgroundColor: '#E86DC3',
      borderRadius: 5,
      padding: 10,
      alignItems: 'center',
      marginBottom: 10,
      marginTop: 20,
      borderColor: 'black',
      borderWidth: 1, 
    },
    saveButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    cancelButton: {
      backgroundColor: 'grey',
      borderRadius: 5,
      padding: 10,
      alignItems: 'center',
      borderColor: 'black',
      borderWidth: 1, 
    },
    cancelButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
});

export default styles;
