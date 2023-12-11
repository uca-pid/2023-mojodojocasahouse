import React from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList, StyleSheet } from 'react-native';
import { PieChart } from "react-native-chart-kit";
import { colorGradientSample } from '../utils/colors';
import { ListItem } from 'react-native-elements';
import { fetchUserCategories, fetchSumOfExpenses } from '../utils/apiFetch';
import { AuthContext } from '../context/AuthContext';
import FilterModal from '../components/FilterModal';
import ScreenTemplate from '../components/ScreenTemplate';

const PieScreen = ({navigation, route}) => {
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [isFilterModalVisible, setFilterModalVisible] = React.useState(false);
  const [chartData, setChartData] = React.useState([]);
  const { sessionExpired } = React.useContext(AuthContext);


  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

  const handleFilterModalSubmit = async (data) => {
    setFilterModalVisible(false);

    try {
      setLoading(true);
      let sumOfExpenses = await fetchSumOfExpenses(sessionExpired, data);
      generateChartData(sumOfExpenses);
    } catch (error) {
      Alert.alert("Connection Error", "There was an error connecting to API");
    } finally {
      setLoading(false);
    }
  };

  const generateChartData = (sumOfExpenses) => {
    let colorSamples = colorGradientSample("#E86DC3", "#eaeaea", sumOfExpenses.length);
    setChartData( 
      sumOfExpenses.map((exp, index) => ({
        index: index,
        category: exp.category,
        amount: exp.amount,
        color: colorSamples[index]
      }))
    );
  };

  const chartConfig = {
    color: () => `rgb(${Math.floor(Math.random() * 255)}, 255, 146)`,
  };

  const handleFocus = async () => {
    try {
      setLoading(true);
      await fetchUserCategories(setCategories, sessionExpired);
      let sumOfExpenses = await fetchSumOfExpenses(sessionExpired);
      generateChartData(sumOfExpenses);
    } catch (error) {
      Alert.alert("Connection Error", "There was an error connecting to API");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleFocus);

    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <ListItem  key={item.index} bottomDivider>
      <ListItem.Content style={styles.listItemContent}>
        <View style={{ backgroundColor: item.color, width: 20, height: 20, marginRight: 10 }} />
        <View style={styles.listItemTextContainer}>
          <ListItem.Title style={styles.listItemTitle}>{item.category}</ListItem.Title>
          <ListItem.Subtitle style={{ color: 'gray', marginLeft: 10 }} >${item.amount.toFixed(2)}</ListItem.Subtitle>
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
          {chartData.length ? (
            <>
              <PieChart
                data={chartData}
                width={340}
                height={200}
                chartConfig={chartConfig}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="90"
                absolute
                hasLegend={false}
              />
              <FlatList
                style={{height: 300, borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: '#d9d9d9'}}
                data={chartData}
                renderItem={renderItem}
              />
            </>
          ) : (
            <Text style={{
              marginTop: '50%',
              fontSize: 20,
              textAlign: 'center',
            }}>
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
