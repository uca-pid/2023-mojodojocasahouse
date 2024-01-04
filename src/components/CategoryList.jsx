import { ScrollView, RefreshControl } from "react-native";
import { useUserCategoriesWithIcons } from "../hooks/categories";
import { ListItem, Icon } from "@rneui/themed";
import LinearGradient from "react-native-linear-gradient";

const CategoryList = ({ onAdd, onSelection, selectedCategory }) => {
  const { isPending: loading, data: userCategories, isRefetching, refetch} = useUserCategoriesWithIcons()


  return (
    <ScrollView
      style={{ height: 450 }}
      refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
    >
      <ListItem
        linearGradientProps={{
          colors: ["#FFFFFF", "#E86DC3"],
          start: { x: 0.9, y: 0 },
          end: { x: -0.7, y: 0 },
        }}
        ViewComponent={LinearGradient}
        bottomDivider
        onPress={onAdd}
      >
        <Icon name="add" type="ionicon" />
        <ListItem.Content>
          <ListItem.Title>Create new category</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      {userCategories?.map((category, index) => (
        <CategoryListItem
          key={index}
          onPress={() => onSelection(category)}
          iconId={category.iconId}
          categoryName={category.category}
          selected={
            selectedCategory?.category == category.category && 
            selectedCategory?.iconId == category.iconId
          } 
        />
      ))}

    </ScrollView>
  );
};

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

const CategoryListItem = ({ onPress, iconId, categoryName, selected }) => {
  return (
    <ListItem 
      containerStyle={selected ? {backgroundColor: '#caffc2'}: null} 
      bottomDivider 
      onPress={onPress}
    >
      <Icon name={iconFactory(iconId)} type="entypo"/>
      <ListItem.Content>
        <ListItem.Title>{categoryName}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

export default CategoryList;
