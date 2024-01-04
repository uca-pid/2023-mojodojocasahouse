import { ScrollView, RefreshControl } from "react-native";
import { useBudgetList } from "../hooks/budgets";
import { ListItem, Icon } from "@rneui/themed";
import LinearGradient from "react-native-linear-gradient";


const BudgetList = ({ onAdd, onSelection }) => {
  const { isPending: loading, data: budgets, isRefetching, refetch} = useBudgetList();
  
  return (
    <ScrollView
      style={{ height: 370 }}
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
          <ListItem.Title>Create new budget</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      {budgets?.map((budget, index) => (
        <ListItem key={index} bottomDivider onPress={() => onSelection(budget)}>
          <Icon name={iconFactory(budget.iconId)} type="entypo" />
          <ListItem.Content>
            <ListItem.Title>{budget.name}</ListItem.Title>
            <ListItem.Subtitle>{budget.category}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
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

export default BudgetList;
