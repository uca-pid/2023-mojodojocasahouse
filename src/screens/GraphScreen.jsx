import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from '../components/LoadingOverlay';
import { BarChart, PieChart,} from "react-native-chart-kit";
import { fetchUserCategories,fetchExpensesList} from '../utils/apiFetch';
import { AuthContext } from '../context/AuthContext';
import FilterModal from '../components/FilterModal';
import {LinearGradient} from 'react-native-linear-gradient';

const GraphScreen = () => {
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isFilterModalVisible, setFilterModalVisible] = React.useState(false);
  const [legendData, setLegendData] = useState([]);
  const {signOut, sessionExpired} = React.useContext(AuthContext);

  


  const handleFocusScreen = async () => {
    await fetchUserCategories(setCategories, sessionExpired);
    await fetchExpensesList(setExpenses, sessionExpired);
    setLoading(false);
  };
    
  
  const randomColorGenerator = (idx) => {
    const sliceColor = [      '#DF928E',
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
    '#DE9894',]
    return sliceColor[idx]
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
        <LoadingOverlay shown={loading} />

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

  logoutButtonContainer: {
    display: 'flex',
    flexDirection: 'row',

    height: '100%',
    aspectRatio: 0.7,

    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutButton: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#d15c54',
    height: '70%',
    aspectRatio: 0.7,
    borderWidth: 1.5,
    borderColor: "#d15c54",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutButtonIcon: {
    fontSize: 23,
  },




  // Menu button container

  menuContainer: {
    display: 'flex',
    flexDirection: 'row',

    width: '100%',
    marginTop: 20,
    backgroundColor: '#433FF4',
    justifyContent: 'space-evenly',
  },

  menuItemContainer: {
    display: 'flex',
    flexDirection: 'row',

    width: 100,
  },



  rnPickerSelect: {
    inputIOS: {
      display: 'flex',
      flexDirection: 'row',

      // width: '100%',
      height: '100%',
      backgroundColor: '#a0d406',

      color: 'black',
      fontSize: 14,
      fontWeight: 'bold',

    },
    placeholder: {
      color: 'black',
      fontSize: 14,
      fontWeight: 'bold',
    },
    inputAndroid: {
      display: 'flex',
      flexDirection: 'row',

      // width: '100%',
      height: '100%',
      backgroundColor: '#a0d406',

      color: 'black',
      fontSize: 14,
      fontWeight: 'bold',
    },
    viewContainer: {
      display: 'flex',
      flexDirection: 'row',

      height: '5%',
      width: '100%',
      marginTop: 20,
      backgroundColor: '#a0d406',

      justifyContent: 'center',
      alignItems: 'stretch'
    }
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
  categorySelectionPicker: {
    marginTop: '2%',
    color: 'black',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Scrollview

  scrollviewContentContainer: {
    paddingBottom: 20,
    borderRadius: 20,
    backgroundColor: 'white', // Background color
  },

  tableContainer: {
    display: 'flex',
    margin: 16,
    backgroundColor: '#e1e1e8', // Table background color
    borderWidth: 1,
    borderColor: '#AEB4E7', // Border color
    borderRadius: 5,
  },

  
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  iconContainer: {
    display: 'flex',
    flexDirection: 'row',

    height: '100%',
    aspectRatio: 1,
    
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    display: 'flex',
    flexDirection: 'row',
    color: 'black',

    fontSize: 25,
  },

  rowMiddleContainer: {
    display: 'flex',
    flexDirection: 'column',

    width: 200, // Máximo posible
    height: '100%',

    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

  conceptContainer: {
    display: 'flex',
    flexDirection: 'row',

    width: '100%',
    height: '50%',

    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  concept: {
    display: 'flex',
    flexDirection: 'row',

    fontSize: 15,
    color: '#000000',

    textAlign: 'left',
  },

  categoryContainer: {
    display: 'flex',
    flexDirection: 'row',

    width: '100%',
    height: '50%',

    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  categoryModalContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '50%',
    marginLeft: '10%',
    marginRight: '10%',
    backgroundColor: '#ADC4C0',
    borderRadius: 10,
    padding: 20,
  },

  category: {
    display: 'flex',
    flexDirection: 'row',

    fontSize: 13,
    color: '#5c5c5c',

    textAlign: 'left',
  },

  rowLeftContainer: {
    display: 'flex',
    flexDirection: 'column',

    width: 80,
    height: '100%',

    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

  amountContainer: {
    display: 'flex',
    flexDirection: 'row',

    width: '100%',
    height: '50%',

    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  amount: {
    display: 'flex',
    flexDirection: 'row',

    fontSize: 15,
    color: '#000000',

    textAlign: 'left',
  },

  dateContainer: {
    display: 'flex',
    flexDirection: 'row',

    width: '100%',
    height: '50%',

    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  date: {
    display: 'flex',
    flexDirection: 'row',

    fontSize: 11,
    color: '#5c5c5c',
    textAlign: 'left',
  },
  textForNoData: {
    marginTop: '50%',
    fontSize: 20,
    textAlign: 'center',
  },
  titulo:{
    textAlign: 'center',
    marginTop: 5,
    fontSize: 18,
    fontFamily: 'sans-serif-medium',

  }
});

export default GraphScreen;
