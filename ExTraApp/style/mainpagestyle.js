import { StyleSheet } from 'react-native';


const mainpagestyle = StyleSheet.create({
    appContainer: {
        backgroundColor: 'white',
        flex: 1,
      },
    
      button: {
        backgroundColor: 'lightgray',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
      },
      buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
      },
      
      logoContainer: {
        flexDirection: 'row',
        display: 'flex',
        height: '10%',
        margin: 5,
        //width: '50%',
        //backgroundColor: 'red',
      },
    
      bottomContainer: {
        height: '5%',
        width: '100%',
        backgroundColor: '#433FF4',
      },
    
      container: {
        flex: 1,
        margin: 10,
        borderRadius: 20,
        //padding: 16,
        backgroundColor: '#AEB4E8', // Background color
      },
      logo: {
        //height: '65%',
        width: '70%',
        aspectRatio: 4,
        resizeMode: 'contain',
        
      
      },
    
      //title: {
      //  fontSize: 50,
      //  color: 'white',
      //  fontWeight: 'bold',
      //  marginBottom: 16,
      //  left: -30,
      //},
    
      tableContainer: {
        margin: 16,
        backgroundColor: 'white', // Table background color
        borderWidth: 1,
        borderColor: '#AEB4E7', // Border color
        borderRadius: 10,
        overflow: 'hidden',
      },
      tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#AEB4E8', // Header background color
        paddingVertical: 8,
      },
      headerCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 8,
      },
      cell: {
        flex: 1,
        textAlign: 'center',
      },
    });

export default mainpagestyle;
