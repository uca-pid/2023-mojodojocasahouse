
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: 'white',
    flex: 1,
  },

  button: {
    backgroundColor: '#E86DC3',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    margin: 10,
    marginLeft: '10%',
    marginHorizontal: '10%',
  },

  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  
  // Logo Container

  headerContainer: {
    display: 'flex',
    flexDirection: 'row',

    height: 80,
    width: '100%',

    justifyContent: 'space-around',
    alignItems: 'center'
  },

  logoContainer: {
    display: 'flex',
    flexDirection: 'row',

    aspectRatio: 3.55,
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: '100%',
    aspectRatio: 2,
    resizeMode: 'contain',
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
    backgroundColor: 'white', // Background color
    height: '100%',
  },
  contentContainer: {
    paddingBottom: 20,

    backgroundColor: 'white', // Background color
  },
  

  textStyle: {
    marginLeft: '5%',
    color: 'black',
    marginBottom: '2%',
  },

  textTitle: {
    textAlign: 'center',
    marginBottom: '2%',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  logo: {
    width: '70%',
    aspectRatio: 4,
    resizeMode: 'contain',

  },


});
