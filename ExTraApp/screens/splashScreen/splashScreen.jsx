import React from 'react';
import { View } from 'react-native';

const SplashScreen = ({ navigation, route }) => {

  React.useEffect(() => {
    handleFocus()
  }, [navigation]);

  return (
    <View style={styles.appContainer}>
      <View style={styles.container}>
        {/* Empty splash screen for modification */}
      </View>
    </View>
  );
};

export default SplashScreen;