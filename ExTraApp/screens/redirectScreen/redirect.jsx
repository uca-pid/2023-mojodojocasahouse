import React from 'react';
import { View } from 'react-native';
import LoadingOverlay from '../../components/loading/loading';
import { fetchWithTimeout } from '../../utils/fetchingUtils';

const RedirectScreen = ({ navigation, route }) => {

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const navigateToHomeScreen = () => {
    navigation.navigate('Table');
  };

  const checkIsLoggedIn = async () => {
    try{
      let response = await fetchWithTimeout("http://localhost:8080/protected", {
        method: "GET",
        credentials: 'include',
      });

      // IS LOGGED IN
      if(response.ok){
        navigateToHomeScreen();
        console.log(navigation)
        return;
      }

      // NOT LOGGED IN
      navigateToLogin();
      return;

    } catch (error) {
      navigateToLogin();
      return;
    }
  };

  React.useEffect(() => {
    checkIsLoggedIn();
  }, [navigation]);

  return (
    <View style={styles.appContainer}>
      <View style={styles.container}>
        <LoadingOverlay 
          shown={true}
        />
      </View>
    </View>
  );
};

export default RedirectScreen;