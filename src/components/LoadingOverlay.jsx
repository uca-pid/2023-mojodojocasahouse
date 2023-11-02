import { Image, View, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    left: 0,
    top: 0,
    opacity: 0.8,
    backgroundColor: "#DDDDDD",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gif: {
    width: 48,
    height: 48
  }
});

export default LoadingOverlay;
