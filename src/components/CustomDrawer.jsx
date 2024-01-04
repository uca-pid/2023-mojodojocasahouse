import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useAuthentication } from '../hooks/authentication';

const CustomDrawer = props => {
  const { signOut, userCredentials, isAuthenticated } = useAuthentication();

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#E86DC3'}}>
        <ImageBackground
          source={require('../../img/menu-bg.jpeg')}
          style={{padding: 20}}>
          <FontAwesome 
            name='user-circle' 
            style={{fontSize: 80, color: "white", marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
            {userCredentials? `${userCredentials.firstName} ${userCredentials.lastName}` : "Anonymous"}
          </Text>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      {isAuthenticated ? (
        <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
          <TouchableOpacity onPress={() => {
              props.navigation.closeDrawer();
              signOut();
            }} style={{paddingVertical: 15}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="exit-outline" size={22} color={'black'}/>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                  color: 'black',
                }}>
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default CustomDrawer;
