import React, { useState, useCallback, useContext, useEffect } from "react";
import { 
  ScrollView, 
  Text, 
  TouchableOpacity, 
  View, 
  RefreshControl 
} from "react-native";
import { ListItem, Icon } from "@rneui/themed";
import LinearGradient from "react-native-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";

import ScreenTemplate from "../components/ScreenTemplate";
import { fetchUserCategoriesWithIcons } from "../utils/apiFetch";
import { AuthContext } from "../context/AuthContext";

const iconFactory = (id) => {
  switch (id) {
    case 1: return "aircraft"
    case 2: return "drink"
    case 3: return "key"
    case 4: return "shopping-cart"
    case 5: return "clapperboard"
    case 6: return "squared-plus"
    case 7: return "man"
    case 8: return "open-book"
    default: return "credit"
  }
};

const CategorySelectionScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [userCategories, setUserCategories] = useState([]);
  const { sessionExpired } = useContext(AuthContext);

  // Debug logging function
  const logCategories = (categories, source) => {
    console.log(`Categories from ${source}:`, 
      categories.map(cat => ({
        id: cat.id, 
        category: cat.category, 
        iconId: cat.iconId
      }))
    );
  };

  // Main fetch function with comprehensive error handling
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      
      // Ensure the function handles setting categories
      await fetchUserCategoriesWithIcons(
        (categories) => {
          // Log categories for debugging
          logCategories(categories, 'fetchUserCategoriesWithIcons');
          
          // Set categories with a check
          setUserCategories(prevCategories => {
            // Optional: Check if categories have changed
            const hasChanged = JSON.stringify(prevCategories) !== JSON.stringify(categories);
            
            console.log('Categories changed:', hasChanged);
            return categories;
          });
        }, 
        sessionExpired
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }, [sessionExpired]);

  // Use both useFocusEffect and useEffect for redundancy
  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, [fetchCategories])
  );

  // Additional useEffect as a fallback
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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

  const handleBack = () => {
    navigation.goBack();
  };

  // Manual refresh function
  const onManualRefresh = () => {
    fetchCategories();
  };

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

        <ScrollView 
          refreshControl={
            <RefreshControl 
              refreshing={loading} 
              onRefresh={onManualRefresh} 
            />
          }
          style={{height: 450}}
        >
          {/* Create New Category Item */}
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

          {/* Debug: Show message if no categories */}
          {userCategories.length === 0 && (
            <View style={{alignItems: 'center', marginTop: 20}}>
              <Text style={{color: 'grey'}}>
                No categories found. Try creating a new one!
              </Text>
            </View>
          )}

          {userCategories.map((category, index) => (
            <ListItem 
              containerStyle={
                route.params?.selectedCategory?.category == category.category 
                  ? {backgroundColor: '#caffc2'}
                  : null
              } 
              key={category.id || index} 
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

        <TouchableOpacity 
          style={{
            backgroundColor: 'grey',
            borderRadius: 5,
            padding: 10,
            alignItems: 'center',
            marginTop: 20,
          }} 
          onPress={handleBack}
        >
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