import React from 'react';
import { View, Text, ScrollView, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { BarChart } from 'react-native-chart-kit';
import { ListItem } from 'react-native-elements'; // Import ListItem
import { fetchUserCategories, fetchYearlySumOfExpenses } from '../utils/apiFetch';
import { AuthContext } from '../context/AuthContext';
import FilterModal from '../components/FilterModal';
import ScreenTemplate from '../components/ScreenTemplate';

const BarScreen = ({navigation, route}) => {
  const [loading, setLoading] = React.useState(false);
  const [yearlyExpenses, setYearlyExpenses] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [isFilterModalVisible, setFilterModalVisible] = React.useState(false);
  const { sessionExpired } = React.useContext(AuthContext);


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

  const handleFocus = async () => {
    try {
      setLoading(true);
      await fetchYearlySumOfExpenses(setYearlyExpenses, sessionExpired);
      await fetchUserCategories(setCategories, sessionExpired);
    } catch (error) {
      Alert.alert("Connection Error", "There was an error connecting to API");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle filter modal submission
  const handleFilterModalSubmit = async (data) => {
    try {
      setLoading(true);
      await fetchYearlySumOfExpenses(setYearlyExpenses, sessionExpired, data);
    } catch (error) {
      Alert.alert("Connection Error", "There was an error connecting to API");
    } finally {
      setLoading(false);
    }
  };

  // Function to toggle filter modal visibility
  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

  const ListItemComponent = ({ year, value }) => (
    <ListItem key={year} bottomDivider>
      <ListItem.Content style={styles.listItemContent}>
        
        <ListItem.Title style={styles.listItemTitle}>{year}</ListItem.Title>
        <ListItem.Subtitle  style={{ color: 'gray', marginLeft: 10 }} >${value}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleFocus);
    handleFocus();
    
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    console.log(yearlyExpenses);
  }, [yearlyExpenses]);


  return (
    <ScreenTemplate loading={loading}>
      <ScreenTemplate.Logo />

      <ScreenTemplate.Content>
        <View style={styles.addExpenseButtonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleFilterModal}>
            <Text style={styles.buttonText}>Choose Categories and Date Range</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.scrollviewContentContainer} horizontal={true}>
          <View style={{ paddingLeft: '5%', paddingBottom: '8%', paddingTop: '16%' }}>
            {yearlyExpenses.length ? (
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
      <FilterModal visible={isFilterModalVisible} data={categories} onDone={handleFilterModalSubmit} onCancel={toggleFilterModal} />
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