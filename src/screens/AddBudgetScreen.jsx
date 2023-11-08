import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ListItem, Icon } from '@rneui/themed';
import DatePicker from 'react-native-date-picker';

import ScreenTemplate from '../components/ScreenTemplate';
import { AppInput } from '../components/AppInput';

const AddBudgetScreen = ({navigation, route}) => {
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [startDateOpen, setStartDateOpen] = React.useState(false);
  const [endDateOpen, setEndDateOpen] = React.useState(false);
  const [nameHasError, setNameError] = React.useState(false);
  const [amountHasError, setAmountError] = React.useState(false);

  const handleSubmit = async () => {
    if(checkForErrors()){
      Alert.alert("Validation error", "Please correct selected fields and try again.");
      return;
    }

    setLoading(true);
    // await postBudgetToApi({
    //   name, amount, ...(route.params.selectedCategory), startDate, endDate
    // });
    setLoading(false);

    Alert.alert("Success", "Budget created successfully!", [
      {text: 'OK', onPress: () => {navigation.navigate("budget-list"); navigation.navigate("Table")}}
    ]);
  };

  const handleBack = async () => {
    navigation.goBack();
  };

  const checkForErrors = () => {
    let nameErr = checkNameError();
    let amountErr = checkAmountError();
    return nameErr || amountErr;
  };

  const checkNameError = () => {
    let regex = /^[A-Za-z\d\s]+$/;
    let isValid = regex.test(name);
    setNameError(!isValid);
    return !isValid;
  };

  const checkAmountError = () => {
    let regex = /^[\d]{1,12}((\.)(\d){1,2})?$/;
    let isValid = regex.test(amount);
    setAmountError(!isValid);
    return !isValid;
  };

  return (
    <ScreenTemplate loading={loading}>
      <ScreenTemplate.Content style={{paddingHorizontal: 15}}>
        <Text style={{
          fontFamily: 'Roboto-Medium',
          fontSize: 28,
          fontWeight: '500',
          color: '#333',
          marginBottom: 30,
          marginTop: 30,
        }}>Create budget</Text>

        <Text>Category</Text>
        <ListItem containerStyle={{marginBottom: 20}}>
          <Icon name="help" type="entypo" />
          <ListItem.Content>
            <ListItem.Title>Category Name</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        
        <Text>Name</Text>
        <AppInput.Budget
          value={name}
          onChangeText={setName}
          errorMessage={nameHasError? "Concept may only contain letters or numbers" : null}
          onEndEditing={checkNameError}
        />

        <Text>Budget Max</Text>
        <AppInput.Amount
          value={amount}
          onChangeText={setAmount}
          errorMessage={amountHasError? "Amount must be positive and limited to cent precision" : null}
          onEndEditing={checkAmountError}
        />

        <Text>Starting date</Text>
        <AppInput.Date
          value={startDate}
          onPress={() => setStartDateOpen(true)}
        />

        <DatePicker
          modal
          mode="date"
          open={startDateOpen}
          date={startDate}
          onConfirm={(selectedDate) => {
            setStartDateOpen(false);
            setStartDate(selectedDate);
          }}
          onCancel={() => {
            setStartDateOpen(false);
          }}
          maximumDate={endDate}
          minimumDate={new Date()}
        />

        <Text>Ending date</Text>
        <AppInput.Date
          value={endDate}
          onPress={() => setEndDateOpen(true)}
        />
        
        <DatePicker
          modal
          mode="date"
          open={endDateOpen}
          date={endDate}
          onConfirm={(selectedDate) => {
            setEndDateOpen(false);
            setEndDate(selectedDate);
          }}
          onCancel={() => {
            setEndDateOpen(false);
          }}
          minimumDate={startDate}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Create</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={handleBack}>
          <Text style={styles.cancelButtonText}>Back</Text>
        </TouchableOpacity>
        
      </ScreenTemplate.Content>

    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  saveButton: {
    backgroundColor: '#E86DC3',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
    borderWidth: 1,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'grey',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddBudgetScreen;
