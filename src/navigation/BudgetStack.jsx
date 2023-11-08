import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BudgetsScreen from '../screens/BudgetsScreen';
import AddBudgetScreen from '../screens/AddBudgetScreen';
import BudgetInfoScreen from '../screens/BudgetInfoScreen';
import CategorySelectionScreen from '../screens/CategorySelectionScreen';

const Stack = createStackNavigator();

const BudgetStack = (props) => {

  return (
    <Stack.Navigator initialRouteName='budget-list'>
      <Stack.Screen 
        name='budget-list'
        component={BudgetsScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name='budget-add'
        component={AddBudgetScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name='budget-info'
        component={BudgetInfoScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="budget-add/categories-list"
        component={CategorySelectionScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

export default BudgetStack;
