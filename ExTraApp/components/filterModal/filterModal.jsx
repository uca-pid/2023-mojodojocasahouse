import React from 'react';
import styles from './styles';
import { View, Text } from 'react-native';
import { Overlay, Input } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import AutocompleteInput from 'react-native-autocomplete-input';
import Autocomplete from '../autocomplete/autocomplete';


/**
 * Recibe ```textInputValue```, ```onChangeTextInput```, ```
 */
const FilterModal = props => {
    const [categoryFilter, setCategoryFilter] = React.useState('');

    return (
        <Overlay isVisible={true}>
            <View style={{height:'70%', width: 300}}>
                <Autocomplete 
                    value={categoryFilter}
                    onChangeText={setCategoryFilter}
                    data={["arithmetics", "astral", "asthma"]}
                />


            {/* <Input
            containerStyle={{width: 200}}
            placeholder='Category'
            rightIcon={
                <Icon
                name='search'
                size={24}
                color='black'
                />
            }
            /> */}

            </View>
        </Overlay>
    );
};

export default FilterModal;
