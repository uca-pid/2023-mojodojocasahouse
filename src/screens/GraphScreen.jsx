import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PieChart } from "react-native-chart-kit";
import { fetchUserCategories,fetchExpensesList} from '../utils/apiFetch';
import { AuthContext } from '../context/AuthContext';
import FilterModal from '../components/FilterModal';
import { LinearGradient } from 'react-native-linear-gradient';
import { Dialog } from '@rneui/themed';

const GraphScreen = () => {
  const [loading, setLoading] = React.useState(false);
  const [expenses, setExpenses] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [isFilterModalVisible, setFilterModalVisible] = React.useState(false);
  const [legendData, setLegendData] = React.useState([]);
  const {signOut, sessionExpired} = React.useContext(AuthContext);

  


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
    color: () => `rgb(${Math.floor(Math.random()*255)}, 255, 146)`,
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
    return categoryExpenses;
  };
    
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      try{
        setLoading(true);
        handleFocusScreen();
      } catch (error) {
        setLoading(false);
        Alert.alert("Connection Error", "There was an error connecting to API");
      }
    });

    return unsubscribe;
  }, [navigation]);
  
  const categoryExpenses = calculateCategoryExpenses();
  
  return (
    <LinearGradient colors={['#E86DC3', 'white']} style={styles.appContainer}>

      <View style={styles.contentContainer}>
        <Dialog isVisible={loading}>
          <Dialog.Loading />
        </Dialog>

        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('./../../img/logo.png')} />
          </View>
        </View>

        <View style={styles.addExpenseButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleFilterModal}>
            <Text style={styles.buttonText}>Use a Filter</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.e}>
          {Object.keys(categoryExpenses).length ? (
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
            paddingLeft="15"
            absolute
            legendData={legendData} // Pass the legend data here
          />
          ) : (
            <Text style={styles.textForNoData}>There is no expenses data available for selected parameters. Please try again</Text>
          )}
        </View>

      </View>
      <FilterModal visible={isFilterModalVisible} data={categories} onDone={handleFilterModalSubmit} onCancel={toggleFilterModal} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    display: 'flex',
    flexDirection: 'column',

    backgroundColor: 'white',
    height: '100%',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',

    margin: "2%",
    marginTop: 20,
    borderRadius: 14,
    backgroundColor: 'white', // Background color
    height: '100%',
    width: '96%',
  },

  // Logo Container

  headerContainer: {
    display: 'flex',
    flexDirection: 'row',

    height: 80,
    width: '100%',

    justifyContent: 'space-around',
    alignItems: 'center'
  },

  logoContainer: {
    display: 'flex',
    flexDirection: 'row',

    aspectRatio: 3.55,
    width: '65%',

    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: '100%',
    aspectRatio: 2,
    resizeMode: 'contain',
  },

  addExpenseButtonContainer: {
    height: '5%',
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

  // Scrollview

  rowMiddleContainer: {
    display: 'flex',
    flexDirection: 'column',

    width: 200, // Máximo posible
    height: '100%',

    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },


  amount: {
    display: 'flex',
    flexDirection: 'row',

    fontSize: 15,
    color: '#000000',

    textAlign: 'left',
  },

  textForNoData: {
    marginTop: '50%',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default GraphScreen;
