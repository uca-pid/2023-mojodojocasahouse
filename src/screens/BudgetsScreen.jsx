import React from "react";
import ScreenTemplate from "../components/ScreenTemplate";
import { fetchUserBudgets } from "../utils/apiFetch";
import { Icon, ListItem } from "@rneui/themed";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

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

const BudgetsScreen = ({navigation, route}) => {
  const [loading, setLoading] = React.useState(false);
  const [userBudgets, setUserBudgets] = React.useState([]);

  const handleFocusScreen = async () => {
    setLoading(true);
    await fetchUserBudgets(setUserBudgets);
    setLoading(false);
  };

  const handleBudgetSelection = (budget) => {
    navigation.navigate("budget-info", {
      selectedBudget: budget
    });
  };

  const handleAddBudget = () => {
    navigation.navigate("budget-add/categories-list");
  };

  const handleBack = async () => {
    navigation.goBack();
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleFocusScreen();
    });

    return unsubscribe;
  }, [navigation]);

  return(
    <ScreenTemplate loading={loading}>
      <ScreenTemplate.Logo />

      <ScreenTemplate.Content style={{paddingHorizontal: 15}}>

        <Text style={{
          fontFamily: 'Roboto-Medium',
          fontSize: 28,
          fontWeight: '500',
          color: '#333',
          marginBottom: 30,
          marginTop: 30,
        }}>Budgets</Text>

        <ScrollView style={{height: 370}}>
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
            <ListItem key={index} bottomDivider onPress={() => handleBudgetSelection(budget)}>
              <Icon name={iconFactory(budget.iconId)} type="entypo"/>
              <ListItem.Content>
                <ListItem.Title>{budget.name}</ListItem.Title>
                <ListItem.Subtitle>{budget.category}</ListItem.Subtitle>
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

export default BudgetsScreen;
