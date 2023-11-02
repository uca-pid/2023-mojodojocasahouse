import React from 'react';
import { View, Image } from 'react-native';
import { Dialog } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';

const ScreenTemplate = (props) => {

  return (
    <LinearGradient colors={['#E86DC3', 'white']} style={{
      backgroundColor: 'white',
      height: '100%',
    }}>
      <View style={{margin: "2%",
        marginTop: "6%",
        borderRadius: 14,
        backgroundColor: 'white', // Background color
        height: '96%',
        width: '96%',
      }}>
        <Dialog isVisible={props.loading || false}>
          <Dialog.Loading/>
        </Dialog>

        {props.children}

      </View>
    </LinearGradient>
  );
};

const ExtraLogo = (props) => {

  return (
    <View style={{
      flexDirection: 'row',
      height: 80,
      width: '100%',
      justifyContent: 'space-around',
      alignItems: 'center'
    }}>
      <View style={{
        flexDirection: 'row',
        aspectRatio: 3.55,
        width: '65%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Image 
          style={{
              width: '100%',
              aspectRatio: 2,
              resizeMode: 'contain',
          }}
          source={require('./../../img/logo.png')} 
        />
      </View>
    </View>
  );
};

const Content = (props) => {

  return (
    <View style={props.style}>
      {props.children}
    </View>
  );
};

ScreenTemplate.Logo = ExtraLogo;
ScreenTemplate.Content = Content;

export default ScreenTemplate;
