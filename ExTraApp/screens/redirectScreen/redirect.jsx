import React from 'react';
import { View } from 'react-native';
import LoadingOverlay from '../../components/loading/loading';
import { checkIsLoggedIn } from '../../utils/apiFetch';

const RedirectScreen = ({ navigation, route }) => {

  React.useEffect(() => {
    checkIsLoggedIn(navigation);
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