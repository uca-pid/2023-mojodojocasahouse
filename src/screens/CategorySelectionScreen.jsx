import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { ListItem, Icon } from "@rneui/themed";
import LinearGradient from "react-native-linear-gradient";

import ScreenTemplate from "../components/ScreenTemplate";
import { fetchUserCategoriesWithIcons } from "../utils/apiFetch";
import { AuthContext } from "../context/AuthContext";

const iconFactory = (id) => {
  switch (id) {
    case 1:
      return "aircraft"
    case 2:
      return "drink"
    case 3:
      return "key"
    case 4:
      return "shopping-cart"
    case 5:
      return "clapperboard"
    case 6:
      return "squared-plus"
    case 7:
      return "man"
    case 8:
      return "open-book"
    default:
      return "credit"
  }
};

const CategorySelectionScreen = ({navigation, route}) => {
  const [loading, setLoading] = React.useState(false);
  const [userCategories, setUserCategories] = React.useState([]);
  const {sessionExpired} = React.useContext(AuthContext);

  const handleFocusScreen = async () => {
    setLoading(true);
    await fetchUserCategoriesWithIcons(setUserCategories, sessionExpired);
    setLoading(false);
  };

  const handleAddCategory = () => {
    const targetScreen = route.name.split("/")[0];

    navigation.navigate(targetScreen + '/categories-add', {
      selectedItem: route.params?.selectedItem
    });
  };

  const handleCategorySelection = (category) => {
    const targetScreen = route.name.split("/")[0];

    navigation.navigate(targetScreen, {
      selectedCategory: category,
      selectedItem: route.params?.selectedItem
    });
  };

  const handleBack = async () => {
    navigation.goBack();
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleFocusScreen();
    });
    handleFocusScreen();
    return unsubscribe;
  }, []);

  return (
    <ScreenTemplate loading={loading}>

      <ScreenTemplate.Content style={{paddingHorizontal: 15}}>
        <Text style={{
          fontFamily: 'Roboto-Medium',
          fontSize: 28,
          fontWeight: '500',
          color: '#333',
          marginBottom: 30,
          marginTop: 30,
        }}>Choose a category</Text>


        <ScrollView style={{height: 450}}>
          <ListItem 
            linearGradientProps={{
              colors: ["#FFFFFF", "#E86DC3"],
              start: { x: 0.9, y: 0 },
              end: { x: -0.7, y: 0 },
            }}
            ViewComponent={LinearGradient}
            bottomDivider
            onPress={handleAddCategory}
            >
            <Icon name="add" type="ionicon"/>
            <ListItem.Content>
              <ListItem.Title>Create new category</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>

          {userCategories.map((category, index) => (
            <ListItem 
              containerStyle={route.params?.selectedCategory?.category == category.category ? {backgroundColor: '#caffc2'}: null} 
              key={index} 
              bottomDivider 
              onPress={() => handleCategorySelection(category)}
            >
              <Icon name={iconFactory(category.iconId)} type="entypo"/>
              <ListItem.Content>
                <ListItem.Title>{category.category}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))}

        </ScrollView>

        <TouchableOpacity style={{
          backgroundColor: 'grey',
          borderRadius: 5,
          padding: 10,
          alignItems: 'center',
          marginTop: 20,
        }} onPress={handleBack}>
          <Text style={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
          }}>Back</Text>
        </TouchableOpacity>
      </ScreenTemplate.Content>
    </ScreenTemplate>
  );
};

export default CategorySelectionScreen;
