import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from '../../components/loading/loading';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { BarChart } from "react-native-chart-kit";
import { postExpenseToApi, fetchUserCategories, fetchExpensesByCategory, fetchExpensesList, deleteExpense } from '../../utils/apiFetch';
import { AuthContext } from '../../context/authContext';
import FilterModal from '../../components/filterModal/filterModal';

const BarScreen = () => {
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isFilterModalVisible, setFilterModalVisible] = React.useState(false);
  const { signOut, sessionExpired } = React.useContext(AuthContext);

  const handleFocusScreen = async () => {
    await fetchUserCategories(setCategories, sessionExpired);
    await fetchExpensesList(setExpenses, sessionExpired);
    setLoading(false);
  };

  const chartConfig2 = {
    backgroundGradientFrom: "#AEB4E8",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#AEB4E8",
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

  useEffect(() => {
    try {
      setLoading(true);
      handleFocusScreen();
    } catch (error) {
      setLoading(false);
      Alert.alert("Connection Error", "There was an error connecting to the API");
    }
  }, [navigation]);

  const yearlyExpenses = calculateYearlyExpenses();

  return (
    <View style={styles.appContainer}>
      <View style={styles.contentContainer}>
        <LoadingOverlay shown={loading} />

        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('./../../img/logo.png')} />
          </View>
        </View>

        <View style={styles.addExpenseButtonContainer}></View>

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
    </View>
  );
};

export default BarScreen;