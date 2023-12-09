import React from 'react';
import { View, Text, ScrollView, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { BarChart } from 'react-native-chart-kit';
import { ListItem } from 'react-native-elements'; // Import ListItem
import { fetchUserCategories, fetchExpensesList } from '../utils/apiFetch';
import { AuthContext } from '../context/AuthContext';
import FilterModal from '../components/FilterModal';
import ScreenTemplate from '../components/ScreenTemplate';

const BarScreen = () => {
  const [loading, setLoading] = React.useState(false);
  const [expenses, setExpenses] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [isFilterModalVisible, setFilterModalVisible] = React.useState(false);
  const [selectedCategories, setSelectedCategories] = React.useState([]); // Updated
  const [selectedDateRange, setSelectedDateRange] = React.useState({ from: null, until: null }); // Updated
  const { signOut, sessionExpired } = React.useContext(AuthContext);

  const handleFocusScreen = async () => {
    await fetchUserCategories(setCategories, sessionExpired);
    await fetchExpensesList(setExpenses, sessionExpired);
    setLoading(false);
  };

  const chartConfig2 = {
    backgroundGradientFrom: "white",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "white",
    height: 10000,
    backgroundGradientToOpacity: 0.5,
    color: () => `#47132D`,
    labelColor: () => `black`,
    fillShadowGradient: `#D47DA8`,
    fillShadowGradientOpacity: 1,
    strokeWidth: 3,
    propsForLabels: {
      fontSize: '12',
    },
    decimalPlaces: 0,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const navigation = useNavigation();

  const calculateYearlyExpenses = () => {
    const yearlyExpenses = {};
    expenses.forEach((expense) => {
      const expenseYear = new Date(expense.date).getFullYear();
      if (!yearlyExpenses[expenseYear]) {
        yearlyExpenses[expenseYear] = 0;
      }
      if (selectedCategories.length === 0 || selectedCategories.includes(expense.category)) { // Check if the expense category is selected
        if (
          (!selectedDateRange.from || new Date(expense.date) >= selectedDateRange.from) &&
          (!selectedDateRange.until || new Date(expense.date) <= selectedDateRange.until)
        ) { // Check if the expense date is within the selected range
          yearlyExpenses[expenseYear] += expense.amount;
        }
      }
    });
    return yearlyExpenses;
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      try {
        setLoading(true);
        handleFocusScreen();
      } catch (error) {
        setLoading(false);
        Alert.alert("Connection Error", "There was an error connecting to the API");
      }
    });
    
    return unsubscribe;
  }, [navigation]);

  const yearlyExpenses = calculateYearlyExpenses();

  // Function to handle filter modal submission
  const handleFilterModalSubmit = (data) => {
    setSelectedCategories(data.categories);
    setSelectedDateRange({ from: data.from, until: data.until });
    setFilterModalVisible(false);
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
            {Object.keys(yearlyExpenses).length ? (
              <>
                <BarChart
                  data={{
                    labels: Object.keys(yearlyExpenses).map(String),
                    datasets: [{ data: Object.values(yearlyExpenses) }],
                  }}
                  width={340}
                  height={230}
                  yAxisLabel="$"
                  chartConfig={chartConfig2}
                  accessor="population"
                  verticalLabelRotation={10}
                  absolute
                  fromZero={true}
                />
                <FlatList
                  data={Object.entries(yearlyExpenses)}
                  keyExtractor={(item) => item[0]}
                  renderItem={({ item }) => (
                    <ListItemComponent year={item[0]} value={item[1]} />
                  )}
                />
              </>
            ) : (
              <Text>No expenses data available.</Text>
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
    height: '8',
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