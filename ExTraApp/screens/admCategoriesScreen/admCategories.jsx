import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';

import { styles } from './style';
import LoadingOverlay from '../../components/loading/loading';
import { API_URL } from "@env";

const AdmCategories = ({ navigation, route }) => {
  const [categoryName, setCategoryName] = React.useState("");
  const [newCategoryIconId, setNewCategoryIconId] = React.useState(9); // Default to 9
  const [loading, setLoading] = React.useState(false);
  const [iconData, setIconData] = React.useState([
    { name: "aircraft", id: 1, selected: false },
    { name: "drink", id: 2, selected: false },
    { name: "key", id: 3, selected: false },
    { name: "shopping-cart", id: 4, selected: false },
    { name: "clapperboard", id: 5, selected: false },
    { name: "squared-cross", id: 6, selected: false },
    { name: "man", id: 7, selected: false },
    { name: "open-book", id: 8, selected: false },
    { name: "help", id: 9, selected: false },
  ]);

  const postAddCategoryToApi = async () => {
    setLoading(true);
    try {
      let response = await fetch(API_URL + "/auth/password/change", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          categoryName: categoryName,
          newCategoryIconId: newCategoryIconId,
        })
      });
      let responseBody = await response.json();
      setLoading(false);

      // OK
      if(response.ok){
        Alert.alert("Category Creation Success", "Category was created successfully", [{text: 'OK', onPress: navigateToHomeScreen}]);
        return;
      }

      // OTHER ERROR
      Alert.alert("API Error", responseBody.message);
    } catch (error) {
      Alert.alert(
        "Connection Error", 
        "There was an error connecting to API"
      );
    }
  };

  const navigateToHomeScreen = () => {
    navigation.navigate('Table');
  };

  const handleIconPress = (iconId) => {
    setNewCategoryIconId(iconId);

    // Update the selected status of icons
    const updatedIconData = iconData.map((icon) => ({
      ...icon,
      selected: icon.id === iconId,
    }));
    setIconData(updatedIconData);
  };

  const handleAddCategory = () => {
    postAddCategoryToApi();
    // Perform any further actions, e.g., API requests to add the category

    // Clear the input and reset the icon ID
    setCategoryName("");
    setNewCategoryIconId(9);

    // Reset the selected status of icons
    const updatedIconData = iconData.map((icon) => ({
      ...icon,
      selected: false,
    }));
    setIconData(updatedIconData);
  };

  const renderIcon = ({ item }) => (
    <TouchableOpacity onPress={() => handleIconPress(item.id)}>
      <Icon name={item.name} style={[styles.icon, { color: item.selected ? 'red' : 'black' }]} />
    </TouchableOpacity>
  );


  return (
    <View style={styles.appContainer}>
      <View style={styles.container}>
        <LoadingOverlay 
          shown={loading}
        />
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('./../../img/logo.png')} />
        </View>

        <View style={styles.bottomContainer}></View>

        <View style={styles.contentContainer}>
          <Text style={styles.textTitle}>Add New Category:</Text>
          <Text style={styles.textStyle}>Name:</Text>
          <TextInput
            style={{ marginLeft: '10%', width: '80%', marginBottom: '5%' }}
            label="New Category Name"
            value={categoryName}
            onChangeText={setCategoryName}
          />
          <Text style={styles.textStyle}>Choose an icon:</Text>
          <FlatList
            data={iconData}
            renderItem={renderIcon}
            keyExtractor={(item) => item.name}
            numColumns={3} 
            style={{ marginLeft: '25%', marginBottom: '5%' }}
          />

          <TouchableOpacity style={styles.button} onPress={handleAddCategory}>
            <Text style={styles.buttonText}>Add Category</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToHomeScreen}>
            <Text style={{ textAlign: 'center' }}>I don't want to change my password. Send me back.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AdmCategories;