import React from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList, StyleSheet } from 'react-native';
import { PieChart } from "react-native-chart-kit";
import { useNavigation } from '@react-navigation/native';
import { ListItem } from 'react-native-elements';
import { fetchUserCategories, fetchExpensesList } from '../utils/apiFetch';
import { AuthContext } from '../context/AuthContext';
import FilterModal from '../components/FilterModal';
import ScreenTemplate from '../components/ScreenTemplate';

const PieScreen = () => {
  const [loading, setLoading] = React.useState(false);
  const [expenses, setExpenses] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [categoryExpenses, setCategoryExpenses] = React.useState([])
  const [isFilterModalVisible, setFilterModalVisible] = React.useState(false);
  const [legendData, setLegendData] = React.useState([]);
  const { signOut, sessionExpired } = React.useContext(AuthContext);




  const handleFocusScreen = async () => {
    await fetchUserCategories(setCategories, sessionExpired);
    await fetchExpensesList(setExpenses, sessionExpired);
    setLoading(false);
  };


  const randomColorGenerator = (idx) => {
    const sliceColor = [
      '#DF928E',
      '#47132D',
      '#CC0066',
      '#A24875',
      '#FF5CAD',
      '#D47DA8',
      '#DCBACB',
      '#634F59',
      '#EE4097',
      '#F82A91',
      '#210010',
      '#CE5650',
      '#F8ACA8',
      '#FA9791',
      '#EE7A74',
      '#EE665F',
      '#B43831',
      '#DC4037',
      '#894542',
      '#744340',
      '#B47E7B',
      '#DE9894'];
    return sliceColor[idx];
  }

  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

  const handleFilterModalSubmit = async (data) => {
    setLoading(true);
    await fetchExpensesList(setExpenses, sessionExpired, data);

    // Calculate category expenses and update the legend
    const updatedCategoryExpenses = calculateCategoryExpenses();
    const updatedLegendData = Object.keys(updatedCategoryExpenses).map((category, idx) => ({
      name: category,
      population: updatedCategoryExpenses[category],
      color: randomColorGenerator(idx),
    }));

    setLegendData(updatedLegendData);
    setFilterModalVisible(false);
    setLoading(false);
  };

  const chartConfig = {
    backgroundGradientFrom: "#DF928E",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#47132D",
    backgroundGradientToOpacity: 0.5,
    color: () => `rgb(${Math.floor(Math.random() * 255)}, 255, 146)`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };


  const navigation = useNavigation();

  const calculateCategoryExpenses = () => {
    // Calculate expenses per category
    const categoryExpenses = {};
    expenses.forEach((expense) => {
      if (!categoryExpenses[expense.category]) {
        categoryExpenses[expense.category] = 0;
      }
      categoryExpenses[expense.category] += expense.amount;
    });
    console.log("categoryExnses:", categoryExpenses)
    return categoryExpenses;
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {

        setLoading(true);
        await handleFocusScreen();

      } catch (error) {
        setLoading(false);
        Alert.alert("Connection Error", "There was an error connecting to API");
      }
    });

    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    if(expenses.length){
      const updatedCategoryExpenses = calculateCategoryExpenses();
      const updatedLegendData = Object.keys(updatedCategoryExpenses).map((category, idx) => ({
        name: category,
        population: updatedCategoryExpenses[category],
        color: randomColorGenerator(idx),
      }));

      setLegendData(updatedLegendData);
      setCategoryExpenses(updatedCategoryExpenses)
      setLoading(false);
    }
  }, [expenses])


  // const categoryExpenses = calculateCategoryExpenses();

  const renderItem = ({ item }) => (
    <ListItem  key={item} bottomDivider>
      <ListItem.Content style={styles.listItemContent}>
        <View style={{ backgroundColor: item.color, width: 20, height: 20, marginRight: 10 }} />
        <View style={styles.listItemTextContainer}>
          <ListItem.Title style={styles.listItemTitle}>{item.name}</ListItem.Title>
          <ListItem.Subtitle style={{ color: 'gray', marginLeft: 10 }} >${item.population.toFixed(2)}</ListItem.Subtitle>
        </View>
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

        <View style={styles.e}>
          {Object.keys(categoryExpenses).length ? (
            <>
              <PieChart
                data={Object.keys(categoryExpenses).map((category, idx) => ({
                  name: category,
                  population: categoryExpenses[category],
                  color: randomColorGenerator(idx),
                }))}
                width={340}
                height={200}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="90"
                absolute
                hasLegend={false}
              />
              <FlatList
                style={{height: 300, borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: '#d9d9d9'}}
                data={legendData}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
              />
            </>
          ) : (
            <Text style={styles.textForNoData}>
              There is no expenses data available for selected parameters. Please try again
            </Text>
          )}
        </View>
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
    color: 'black',

  },


  // Scrollview

  textForNoData: {
    marginTop: '50%',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default PieScreen;
