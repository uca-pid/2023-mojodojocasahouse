import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from '../components/LoadingOverlay';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { BarChart } from "react-native-chart-kit";
import { postExpenseToApi, fetchUserCategories, fetchExpensesByCategory, fetchExpensesList, deleteExpense } from '../utils/apiFetch';
import { AuthContext } from '../context/AuthContext';
import FilterModal from '../components/FilterModal';
import {LinearGradient} from 'react-native-linear-gradient';

const BarScreen = () => {
  const [loading, setLoading] = React.useState(false);
  const [expenses, setExpenses] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [isFilterModalVisible, setFilterModalVisible] = React.useState(false);
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
      yearlyExpenses[expenseYear] += expense.amount;
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
          <Text style={styles.titulo}>Gastos totales por año</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollviewContentContainer} horizontal={true}>
          <View style={{ paddingLeft: '5%', paddingBottom: '7%', paddingTop: '16%' }}>
            {Object.keys(yearlyExpenses).length ? (
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
                verticalLabelRotation={30}
                absolute
              />
            ) : (
              <Text>No expenses data available.</Text>
            )}
          </View>
        </ScrollView>
      </View>
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

export default BarScreen;