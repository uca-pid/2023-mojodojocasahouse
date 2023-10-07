import React from "react";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: 'white',
    flex: 1,
  },

  button: {
    backgroundColor: '#e8c02e',

    paddingBottom: '2.5%',
    paddingTop: '2.5%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
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
    marginTop: '4%',
    backgroundColor: '#433FF4',
  },

  container: {
    flex: 1,
    margin: 10,
    borderRadius: 20,
    //padding: 16,
    backgroundColor: '#AEB4E8', // Background color
  },

  Settinglogo: {
    marginLeft: 55,
    marginTop: 12,
    width: '45%',
    aspectRatio: 4,
    resizeMode: 'contain'

  },


  logo: {
    //height: '65%',
    width: '70%',
    aspectRatio: 4,
    resizeMode: 'contain',
    
  
  },


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
    flex: 2,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerCellId: {
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
    flex: 2,
    textAlign: 'center',
    color: 'black',
  },

  cellId: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
  },
});
