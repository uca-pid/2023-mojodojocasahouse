import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView, Alert, } from 'react-native';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from '../../components/loading/loading';
import { BarChart, PieChart,} from "react-native-chart-kit";
import { fetchUserCategories,fetchExpensesList} from '../../utils/apiFetch';
import { AuthContext } from '../../context/authContext';
import FilterModal from '../../components/filterModal/filterModal';

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
        const sliceColor = ['#DF928E', '#47132D', '#CC0066', '#A24875', '#FF5CAD', '#D47DA8', '#DCBACB', '#634F59', '#EE4097', '#F82A91', '#210010', '#CE5650']
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
        try{
          setLoading(true);
          handleFocusScreen();
        } catch (error) {
          setLoading(false);
          Alert.alert("Connection Error", "There was an error connecting to API");
        }
      },[navigation]);
    
      const categoryExpenses = calculateCategoryExpenses();
    
      return (
        <View style={styles.appContainer}>
          <View style={styles.contentContainer}>
            <LoadingOverlay shown={loading} />
    
            <View style={styles.headerContainer}>
              <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('./../../img/logo.png')} />
              </View>
            </View>
    
            <View style={styles.addExpenseButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleFilterModal}>
                <Text style={styles.buttonText}>User a Filter</Text>
              </TouchableOpacity>
            </View>
    
            <View style={styles.pieChartContainer}>
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
                <Text>No expenses data available.</Text>
              )}
            </View>

          </View>
          <FilterModal visible={isFilterModalVisible} data={categories} onDone={handleFilterModalSubmit} onCancel={toggleFilterModal} />
        </View>
      );
    };
    
    export default GraphScreen;
    

    