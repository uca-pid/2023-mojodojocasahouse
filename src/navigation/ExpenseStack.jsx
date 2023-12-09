import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CategorySelectionScreen from '../screens/CategorySelectionScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import NewCategoryScreen from '../screens/NewCategoryScreen';
import ModifyExpenseScreen from '../screens/ModifyExpenseScreen';

const Stack = createStackNavigator();

const ExpenseStack = (props) => {

  return (
    <Stack.Navigator initialRouteName='expense-add/categories-list'>
      <Stack.Screen 
        name='expense-add'
        component={AddExpenseScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name='expense-modify'
        component={ModifyExpenseScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="expense-add/categories-list"
        component={CategorySelectionScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="expense-modify/categories-list"
        component={CategorySelectionScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="expense-add/categories-add"
        component={NewCategoryScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="expense-modify/categories-add"
        component={NewCategoryScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

export default ExpenseStack;
