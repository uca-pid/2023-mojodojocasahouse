import React from "react";
import { Text, TouchableOpacity } from "react-native";

import ScreenTemplate from "../components/ScreenTemplate";
import { ListItem, Icon } from "@rneui/themed";
import { ProgressChart } from "react-native-chart-kit";
import { ScrollView } from "react-native";

const BudgetInfoScreen = ({navigation, route}) => {
  const [loading, setLoading] = React.useState(false);
  const [budgetInfo, setBudgetInfo] = React.useState(route.params.selectedBudget);

  const handleFocusScreen = async () => {
    setLoading(true);
    // await fetchBudgetInfo(route.params.selectedBudget.id, setBudgetInfo);
    setLoading(false);
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

  return (
    <ScreenTemplate loading={loading}>

      <ScreenTemplate.Content style={{paddingHorizontal: 15}}>
        <ScrollView>
          <Text style={{
          fontFamily: 'Roboto-Medium',
          fontSize: 28,
          fontWeight: '500',
          color: '#333',
          marginBottom: 30,
          marginTop: 30,
          }}>{budgetInfo.name}</Text>

          <Text>Category</Text>
          <ListItem>
              <Icon name={budgetInfo.categoryIcon} type="entypo" />
              <ListItem.Content>
                  <ListItem.Title>{budgetInfo.categoryName}</ListItem.Title>
              </ListItem.Content>
          </ListItem>

          <Text>Starting date</Text>
          <ListItem>
              <Icon name="arrow-expand-right" type="material-community" />
              <ListItem.Content>
                  <ListItem.Title>{budgetInfo.categoryName}</ListItem.Title>
              </ListItem.Content>
          </ListItem>

          <Text>Ending date</Text>
          <ListItem>
              <Icon name="arrow-expand-left" type="material-community" />
              <ListItem.Content>
                  <ListItem.Title>{budgetInfo.categoryName}</ListItem.Title>
              </ListItem.Content>
          </ListItem>

          <Text>Budget amount</Text>
          <ListItem>
              <Icon name="credit" type="entypo" />
              <ListItem.Content>
                  <ListItem.Title>{budgetInfo.categoryName}</ListItem.Title>
              </ListItem.Content>
          </ListItem>

          <Text>Amount spent</Text>
          <ListItem>
            <Icon name="credit" type="entypo" />
            <ListItem.Content>
              <ListItem.Title>{budgetInfo.categoryName}</ListItem.Title>
            </ListItem.Content>
          </ListItem>

          <ProgressChart 
            data={{
              labels: ["Spent"], // optional
              data: [0.7]
            }}
            width={330}
            height={150}
            radius={50}
            chartConfig={{
              color: (opacity = 1) => `rgba(232, 109, 195, ${opacity})`,
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
            }}
            hideLegend={true}
          />

          <TouchableOpacity style={{
            backgroundColor: 'grey',
            borderRadius: 5,
            padding: 10,
            alignItems: 'center',
          }} onPress={handleBack}>
            <Text style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
            }}>Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </ScreenTemplate.Content>
    </ScreenTemplate>
  );
};

export default BudgetInfoScreen;
