import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useNavigation, DrawerActions  } from '@react-navigation/native';
import { Dialog } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native';

const ScreenTemplate = (props) => {
  return (
    <LinearGradient colors={['#E86DC3', 'white']} style={{
      backgroundColor: 'white',
      height: '100%',
    }}>
      <View style={{
        margin: "2%",
        marginTop: "6%",
        borderRadius: 14,
        backgroundColor: 'white', // Background color
        height: '96%',
        width: '96%',
      }}>
        <Dialog isVisible={props.loading || false}>
          <Dialog.Loading />
        </Dialog>
        {props.children}
      </View>
    </LinearGradient>
  );
};

const ExtraLogo = (props) => {
  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View style={{
      flexDirection: 'row',
      height: 80,
      width: '100%',
      justifyContent: 'space-around',
      alignItems: 'center',
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
        {props.hideNav ? null : (
          <View style={{ position: 'absolute', left: -45, top: 10 }}>
            <TouchableOpacity onPress={openDrawer} style={{ padding: 10 }}>
              <Ionicons name="menu-outline" size={35} color={'black'} />
            </TouchableOpacity>
          </View>
        )}
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

const ScrollableContent = (props) => {
  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={props.style}>
      {props.children}
    </ScrollView>
  );
};

ScreenTemplate.Logo = ExtraLogo;
ScreenTemplate.Content = Content;
ScreenTemplate.Scrollable = ScrollableContent;

export default ScreenTemplate;