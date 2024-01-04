import React from "react";
import { Text } from "react-native";

import ScreenTemplate from "../components/ScreenTemplate";
import BackButton from "../components/BackButton";
import CategoryList from "../components/CategoryList";


const CategorySelectionScreen = ({navigation, route}) => {

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

  return (
    <ScreenTemplate>
      <ScreenTemplate.Content style={{paddingHorizontal: 15}}>
        <Text style={{
          fontFamily: 'Roboto-Medium',
          fontSize: 28,
          fontWeight: '500',
          color: '#333',
          marginBottom: 30,
          marginTop: 30,
        }}>Choose a category</Text>

        <CategoryList 
          onAdd={handleAddCategory}
          onSelection={handleCategorySelection}
          selectedCategory={route.params?.selectedCategory}
        />

        <BackButton />

      </ScreenTemplate.Content>
    </ScreenTemplate>
  );
};

export default CategorySelectionScreen;
