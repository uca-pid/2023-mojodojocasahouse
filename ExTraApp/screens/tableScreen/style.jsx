import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: 'white',
    height: '100%',
  },

  button: {
    backgroundColor: 'lightgray',
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
    margin: 10,
    marginTop: 20,
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

  tableContainer: {
    display: 'flex',
    margin: 16,
    backgroundColor: 'white', // Table background color
    borderWidth: 1,
    borderColor: '#AEB4E7', // Border color
    // borderRadius: 10,
    // overflow: 'hidden',
    // backgroundColor: '#FF0000'
  },

  tableHeader: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AEB4E8', // Header background color
    // paddingVertical: 8,
    // backgroundColor: '#00FF00',
    height: 50,
    width: '100%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },

  headerCellContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00FFFF',
  },

  headerCell: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    fontSize: 14,
    backgroundColor: '#FFFF00',
  },

  tableBody: {
    // height: 100,
    height: 440,
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingLeft: '5%',
    paddingRight: '5%',
  },

  cellContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
  },

  cell: {
    textAlign: 'center',
    color: 'black',
    fontSize: 12,
  },

});
