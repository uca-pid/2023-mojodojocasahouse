import React from 'react';
import styles from './styles';
import { View } from 'react-native';
import { Icon, Overlay, Button, ListItem } from '@rneui/themed';
import Autocomplete from '../autocomplete/autocomplete';
import DatePicker from 'react-native-date-picker';


/**
 * Recibe ```textInputValue```, ```onChangeTextInput```, ```
 */
const FilterModal = props => {
    const [categoryFilter, setCategoryFilter] = React.useState(null);
    const [startingDate, setStartingDate] = React.useState(new Date());
    const [isStartingDateModalOpen, setOpenStartingDateModal] = React.useState(false);
    const [isEndingDateModalOpen, setOpenEndingDateModal] = React.useState(false);
    const [endingDate, setEndingDate] = React.useState(new Date());

    const handleSubmit = () => {
      let data = {
        startingDate,
        endingDate,
        selectedCategory: categoryFilter == '' ? null : categoryFilter
      };

      props.onDone(data);
    };

    const handleCancel = () => {
      props.onCancel();
    };

    return (
      <Overlay isVisible={props.visible}>
        <View style={{height:'70%', width: 300}}>

          <View style={{...styles.middleSection}}>

            <View style={styles.categoryFilterContainer}>

              <View style={styles.autocompleteContainer}>
                <Autocomplete 
                  value={categoryFilter}
                  onChangeText={setCategoryFilter}
                  data={props.data}
                  placeholder="Any category"
                />
              </View>

            </View>

            <View style={styles.dateButtonContainer}>
              <ListItem bottomDivider topDivider onPress={() => setOpenStartingDateModal(true)}>
                <Icon name="arrow-expand-right" type="material-community" color="grey" />
                <ListItem.Content>
                  <ListItem.Title>From {startingDate.toLocaleDateString('es-AR')}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </View>

            <View style={styles.dateButtonContainer}>
              <ListItem bottomDivider topDivider onPress={() => setOpenEndingDateModal(true)}>
                <Icon name="arrow-expand-left" type="material-community" color="grey" />
                <ListItem.Content>
                  <ListItem.Title>Until {endingDate.toLocaleDateString('es-AR')}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </View>
            
            <View>
              {/* <Button title="Starting date" onPress={() => setOpenStartingDateModal(true)} /> */}
              <DatePicker
                modal
                date={startingDate}
                maximumDate={endingDate}
                open={isStartingDateModalOpen}
                onConfirm={(date) => {
                  setOpenStartingDateModal(false)
                  setStartingDate(date)
                }}
                onCancel={() => setOpenStartingDateModal(false)}
                mode='date'
                locale='en-US'
              />
            </View>

            <View>
              {/* <Button title="Ending date" onPress={() => setOpenEndingDateModal(true)} /> */}
              <DatePicker 
                modal
                date={endingDate}
                minimumDate={startingDate}
                open={isEndingDateModalOpen}
                onConfirm={(date) => {
                  setOpenEndingDateModal(false)
                  setEndingDate(date)
                }}
                onCancel={() => setOpenEndingDateModal(false)}
                mode='date'
                locale='en-US'
              />
            </View>
          </View>

          <View style={{...styles.bottomSection}}>
            
            <Button
              title="Done"
              buttonStyle={{
                borderColor: 'rgba(2, 204, 42, 1)',
              }}
              type="outline"
              raised
              titleStyle={{ color: 'rgba(2, 204, 42, 1)' }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              onPress={handleSubmit}
            />
            
            <Button
              title="Cancel"
              buttonStyle={{
                borderColor: '#a1a1a1',
              }}
              type="outline"
              raised
              titleStyle={{ color: '#696969' }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              onPress={handleCancel}
            />
            
          </View>

        </View>
      </Overlay>
    );
};

export default FilterModal;
