import React from 'react';
import { View } from 'react-native';
import { Dialog } from '@rneui/themed';

import LoadingOverlay from '../../components/loading/loading';
import { checkIsLoggedIn } from '../../utils/apiFetch';

const RedirectScreen = ({ navigation, route }) => {
  const [loading, setLoading] = React.useState(false);

  const handleFocus = async () => {
    setLoading(true);
    await checkIsLoggedIn(navigation);
    setLoading(false);
  };

  React.useEffect(() => {
    handleFocus()
  }, [navigation]);

  return (
    <View style={styles.appContainer}>
      <View style={styles.container}>
        <Dialog isVisible={loading}>
          <Dialog.Loading />
        </Dialog>

        {/* <LoadingOverlay 
          shown={loading}
        /> */}
      </View>
    </View>
  );
};

export default RedirectScreen;