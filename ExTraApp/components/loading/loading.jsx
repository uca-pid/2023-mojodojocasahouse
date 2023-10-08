import { Image, View } from 'react-native';
import styles from './style';

const gifImage = require("../../img/loading.gif");

const LoadingOverlay = ({shown}) => {

  return (
    <>
    { shown &&
      <View style={styles.container}>
        <Image 
          style={styles.gif}
          source={gifImage}
        />
      </View>
    }
    </>
  );
};

export default LoadingOverlay;
