
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: 'white',
    flex: 1,
  },

  button: {
    backgroundColor: 'lightgray',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    margin: 10,
    marginLeft: '30%',
    marginHorizontal: '30%',
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


  },

  bottomContainer: {
    height: '4.5%',
    width: '100%',
    marginTop: '4%',
    backgroundColor: '#433FF4',
    marginBottom: '10%',
  },

  container: {
    flex: 1,
    margin: 10,
    borderRadius: 20,
    backgroundColor: '#AEB4E8', // Background color
  },
  logo: {
    width: '70%',
    aspectRatio: 4,
    resizeMode: 'contain',
    
  
  },


});


const selectButtons = StyleSheet.create({
    taggedInputContainer: {
        width: '100%',
        flex: 12.5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    inputTagContainer: {
        width: '25%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputTag: {
        fontFamily: 'Inder-Regular',
        color: '#FEFAFA',
    },
    inputElementsContainer: {
        width: '65%',
        height: '80%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignContent: 'center',
    },
    pressableWrapper: {
        display: 'flex',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: '#9A2E2E',
        borderWidth: 2,
        borderRadius: 10,
        overflow: 'hidden',
    },
    unselectedPressable: {
        display: 'flex',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        paddingHorizontal: '3%',
        paddingVertical: '4%',
    },
    selectedPressable: {
        display: 'flex',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#44CD7B',
        paddingHorizontal: '3%',
        paddingVertical: '4%',
    },
    pressableLabel: {
        fontFamily: 'Inder-Regular',
        color: '#7D7676',
    },
});

export {styles, selectButtons};