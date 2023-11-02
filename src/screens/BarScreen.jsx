import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarChart } from "react-native-chart-kit";
import { fetchUserCategories, fetchExpensesList } from '../utils/apiFetch';
import { AuthContext } from '../context/AuthContext';
import FilterModal from '../components/FilterModal';
import {LinearGradient} from 'react-native-linear-gradient';
import { Dialog } from '@rneui/themed';

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
        <Dialog isVisible={loading}>
          <Dialog.Loading/>
        </Dialog>

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




  addExpenseButtonContainer: {
    height: '5%',
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


  amount: {
    display: 'flex',
    flexDirection: 'row',

    fontSize: 15,
    color: '#000000',

    textAlign: 'left',
  },
  titulo:{
    textAlign: 'center',
    marginTop: 5,
    fontSize: 18,
    fontFamily: 'sans-serif-medium',

  }
});

export default BarScreen;