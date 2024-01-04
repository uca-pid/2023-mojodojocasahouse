import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { BarChart } from 'react-native-chart-kit';
import { ListItem } from '@rneui/themed';

import ScreenTemplate from '../components/ScreenTemplate';
import { useYearlySumOfExpenses } from '../hooks/expenses';
import FilterButton from '../components/Filter';


const BarScreen = ({navigation, route}) => {
  const [filterData, setFilterData] = useState({});

  const { isPending: loading, data: yearlyExpenses } = useYearlySumOfExpenses(filterData);

  const chartConfig2 = {
    backgroundGradientFrom: "white",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "white",
    backgroundGradientToOpacity: 1,
    fillShadowGradientFromOpacity: 0.9,
    fillShadowGradientToOpacity: 0.1,
    color: (opacity = 1) => `rgba(232, 109, 195, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(52, 52, 52, ${opacity})`,
    bgColor: "white",
    propsForLabels: {
      fontSize: 12,
    },
    decimalPlaces: 0,
    barPercentage: 0.5,
  };



  const ListItemComponent = ({ year, value }) => (
    <ListItem key={year} bottomDivider>
      <ListItem.Content style={styles.listItemContent}>
        <ListItem.Title style={styles.listItemTitle}>{year}</ListItem.Title>
        <ListItem.Subtitle  style={{ color: 'gray', marginLeft: 10 }} >${value}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );


  return (
    <ScreenTemplate loading={loading}>
      <ScreenTemplate.Logo />

      <ScreenTemplate.Content>
        
        <FilterButton onDone={setFilterData} />

        <ScrollView style={styles.scrollviewContentContainer} horizontal={true}>
          <View style={{ paddingLeft: '5%', paddingBottom: '8%', paddingTop: '16%' }}>
            {yearlyExpenses && yearlyExpenses.length ? (
              <>
                <BarChart
                  data={{
                    labels: yearlyExpenses.map(exp => "'" + exp.year.toString().slice(2)),
                    datasets: [{ data: yearlyExpenses.map(exp => exp.amount) }],
                  }}
                  width={310}
                  height={230}
                  yAxisLabel="$"
                  chartConfig={chartConfig2}
                  verticalLabelRotation={30}
                  absolute={true}
                  fromZero={true}
                />
                <FlatList
                  style={{height: 200}}
                  data={yearlyExpenses}
                  renderItem={({ item }) => (
                    <ListItemComponent key={item.year} year={item.year} value={item.amount}/>
                  )}
                />
              </>
            ) : (
              <Text style={{
                fontSize: 20,
              }}>
                There is no expenses data available for selected parameters. Please try again
              </Text>
            )}
          </View>
        </ScrollView>
      </ScreenTemplate.Content>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({

  addExpenseButtonContainer: {
    height: 37,
    width: '80%',
    marginLeft: '10%',
    marginTop: '1%',
    backgroundColor: '#ed93d2',
    borderRadius: 10,
  },

  // Scrollview

  scrollviewContentContainer: {
    paddingBottom: 20,
    borderRadius: 20,
    backgroundColor: 'white', // Background color
  },

  button: {
    backgroundColor: '#E86DC3',
    paddingBottom: '2.5%',
    paddingTop: '2.5%',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },

  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    color: 'black',
    position: 'absolute'
  },
  listItemTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'black',
  },
  listItemTitle: {
    marginLeft: 10,
    color: '#A24875',

  },

});

export default BarScreen;