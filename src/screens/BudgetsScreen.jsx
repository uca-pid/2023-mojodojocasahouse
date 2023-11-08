import React from "react";
import ScreenTemplate from "../components/ScreenTemplate";
import { Icon, ListItem } from "@rneui/themed";
import { ScrollView, View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const example_budgets = [
  {name: "Reforms", categoryIcon: "key", categoryName: "Housing", id: 0},
  {name: "Streaming Cutbacks", categoryIcon: "clapperboard", categoryName: "Entertainment", id: 1}
];

const BudgetsScreen = ({navigation, route}) => {
  const [loading, setLoading] = React.useState(false);
  const [userBudgets, setUserBudgets] = React.useState(example_budgets);

  const handleFocusScreen = async () => {
    setLoading(true);
    // await fetchUserBudgets(setUserBudgets);
    setLoading(false);
  };

  const handleBudgetSelection = (budgetId) => {
    navigation.navigate("budget-add", { budgetId });
  };

  const handleAddBudget = () => {
    navigation.navigate("budget-add");
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleFocusScreen();
    });

    return unsubscribe;
  }, [navigation]);

  return(
    <ScreenTemplate loading={loading}>
      <ScrollView style={{padding: 15}}>

        <Text style={{
          fontFamily: 'Roboto-Medium',
          fontSize: 28,
          fontWeight: '500',
          color: '#333',
          marginBottom: 30,
          marginTop: 30,
        }}>Budgets</Text>

        <ListItem 
          linearGradientProps={{
            colors: ["#FFFFFF", "#E86DC3"],
            start: { x: 0.9, y: 0 },
            end: { x: -0.7, y: 0 },
          }}
          ViewComponent={LinearGradient}
          bottomDivider
          onPress={handleAddBudget}
          >
          <Icon name="add" type="ionicon"/>
          <ListItem.Content>
            <ListItem.Title>Create new budget</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        {userBudgets.map((budget, index) => (
          <ListItem key={index} bottomDivider onPress={() => handleBudgetSelection(budget.id)}>
            <Icon name={budget.categoryIcon} type="entypo"/>
            <ListItem.Content>
              <ListItem.Title>{budget.name}</ListItem.Title>
              <ListItem.Subtitle>{budget.categoryName}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
        
      </ScrollView>

    </ScreenTemplate>
  );
};

export default BudgetsScreen;
