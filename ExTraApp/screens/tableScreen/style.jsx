import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  appContainer: {
    display: 'flex',
    flexDirection: 'column',

    backgroundColor: 'white',
    height: '100%',
  },

  contentContainer: {
    display: 'flex',
    flexDirection: 'column',

    margin: "2%",
    marginTop: 20,
    borderRadius: 14,
    backgroundColor: '#AEB4E8', // Background color
    height: '100%',
    width: '96%',
  },



  // Logo Container

  headerContainer: {
    display: 'flex',
    flexDirection: 'row',

    height: 80,
    width: '100%',
    // backgroundColor: '#0000FF',

    justifyContent: 'space-around',
    alignItems: 'center'
  },

  logoContainer: {
    display: 'flex',
    flexDirection: 'row',

    aspectRatio: 3.55,
    width: '65%',
    // backgroundColor: '#00FF00',

    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    height: '100%',
    width: null,
    aspectRatio: 3.55,
    resizeMode: 'contain',
  },

  logoutButtonContainer: {
    display: 'flex',
    flexDirection: 'row',

    // backgroundColor: '#FF00FF',
    height: '100%',
    aspectRatio: 0.7,

    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutButton: {
    display: 'flex',
    flexDirection: 'row',

    borderRadius: 10,
    backgroundColor: '#FF3641',
    height: '70%',
    aspectRatio: 0.7,
    borderWidth: 1.5,
    borderColor: "#FF5961",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutButtonIcon: {
    fontSize: 23,
  },




  // Menu button container

  menuContainer: {
    display: 'flex',
    flexDirection: 'row',

    width: '100%',
    marginTop: 20,

    justifyContent: 'space-evenly',
  },

  menuItemContainer: {
    display: 'flex',
    flexDirection: 'row',

    width: 120,
  },






  // Bottom container

  categoryFilterContainer: {
    height: '5%',
    width: '100%',
    marginTop: 20,
    backgroundColor: '#433FF4',
  },

  addExpenseButtonContainer: {
    height: '5%',
    width: '100%',
    marginTop: '1%',
    backgroundColor: '#433FF4',
  },

  categoryButton: {
    backgroundColor: '#a0d406',

    paddingBottom: '2.5%',
    paddingTop: '2.5%',
    alignItems: 'center',
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



  // tableHeader: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   // justifyContent: 'space-evenly',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#AEB4E8', // Header background color
  //   // paddingVertical: 8,
  //   // backgroundColor: '#00FF00',
  //   height: 50,
  //   width: '100%',
  //   paddingLeft: '5%',
  //   paddingRight: '5%',
  // },

  // headerCellContainer: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   width: '25%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#00FFFF',
  // },

  // headerCell: {
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   color: '#000000',
  //   fontSize: 14,
  //   backgroundColor: '#FFFF00',
  // },

  scrollviewContentContainer: {
    paddingBottom: 20,
    borderRadius: 20,
    backgroundColor: '#AEB4E8', // Background color
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

  
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  iconContainer: {
    display: 'flex',
    flexDirection: 'row',

    height: '100%',
    aspectRatio: 1,
    
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    display: 'flex',
    flexDirection: 'row',

    fontSize: 25,
  },

  rowMiddleContainer: {
    display: 'flex',
    flexDirection: 'column',

    width: 200, // Máximo posible
    height: '100%',

    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

  conceptContainer: {
    display: 'flex',
    flexDirection: 'row',

    width: '100%',
    height: '50%',

    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  concept: {
    display: 'flex',
    flexDirection: 'row',

    fontSize: 15,
    color: '#000000',

    textAlign: 'left',
  },

  categoryContainer: {
    display: 'flex',
    flexDirection: 'row',

    width: '100%',
    height: '50%',

    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  category: {
    display: 'flex',
    flexDirection: 'row',

    fontSize: 13,
    color: '#5c5c5c',

    textAlign: 'left',
  },

  rowLeftContainer: {
    display: 'flex',
    flexDirection: 'column',

    width: 80,
    height: '100%',

    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

  amountContainer: {
    display: 'flex',
    flexDirection: 'row',

    width: '100%',
    height: '50%',

    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  amount: {
    display: 'flex',
    flexDirection: 'row',

    fontSize: 15,
    color: '#000000',

    textAlign: 'left',
  },

  dateContainer: {
    display: 'flex',
    flexDirection: 'row',

    width: '100%',
    height: '50%',

    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  date: {
    display: 'flex',
    flexDirection: 'row',

    fontSize: 11,
    color: '#5c5c5c',

    textAlign: 'left',
  },

});
