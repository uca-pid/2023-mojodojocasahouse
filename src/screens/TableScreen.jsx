import { useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';

import ScreenTemplate from '../components/ScreenTemplate';
import { useDeleteExpense, useExpenseList } from '../hooks/expenses';
import FilterButton from '../components/Filter';
import ExpenseListItem from '../components/ExpenseListItem';
import AddExpenseButton from '../components/AddExpenseButton';


const TableScreen = ({navigation, route}) => {
  const [ filterData, setFilterData ] = useState({});

  const { isPending: isPendingExpenses, data: expenses, isRefetching, refetch } = useExpenseList(filterData);
  const { isPending: isPendingDelete, mutate: deleteExpense } = useDeleteExpense();
  const loading = isPendingExpenses || isPendingDelete;

  const handleEditExpense = (item) => {
    navigation.navigate("Add Expense", {
      screen: "expense-modify/categories-list",
      params: {
        selectedCategory: {category: item.category, iconId: item.iconId},
        selectedItem: item
      },
    });
  };


  return (
    <ScreenTemplate loading={loading}>
      <ScreenTemplate.Logo/>

      <ScreenTemplate.Content>
        <AddExpenseButton/>

        <FilterButton onDone={setFilterData} />

        <ScrollView 
          style={{height: 450}} 
          contentContainerStyle={styles.scrollviewContentContainer}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch}/>
          }
        >
          
          { expenses?.map((item, index) => (
            <ExpenseListItem 
              key={index}
              data={item}
              onEdit={handleEditExpense}
              onDelete={deleteExpense}
            />))
          }

        </ScrollView>
      </ScreenTemplate.Content>
      
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({

  scrollviewContentContainer: {
    display: 'flex',
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: '#e1e1e8', // Table background color
    borderWidth: 1,
    borderColor: '#AEB4E7', // Border color
  },

});

export default TableScreen;
