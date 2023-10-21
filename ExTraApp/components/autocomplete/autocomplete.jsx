import React from "react";
import { TouchableHighlight, Pressable, View, Text } from "react-native";
import { Input, Icon } from "@rneui/themed";
import styles from "./styles";

/**
 * ```data``` prop should be passed as an array of strings.
 */
const Autocomplete = props => {
  const [areResultsShown, setShowResults] = React.useState(false);
  const [filteredResults, setFilteredResults] = React.useState([]);

  const AutocompleteItem = itemProps => {
    return (
      <Pressable onPress={() => props.onChangeText(itemProps.value)}>
        <Text>{itemProps.value}</Text>
      </Pressable>
    );
  };

  const filterResults = () => {
    if (props.value == ''){
      setFilteredResults([]);
      return;
    }

    let filteredResults = props.data.filter((item) => {
      return item.toLowerCase().startsWith(props.value.toLowerCase());
    }).slice(0, 3);
    setFilteredResults(filteredResults);
  };

  return(
    <View style={styles.componentContainer}>

      <View style={styles.inputContainer}>

        <Input 
          value={props.value}
          onChangeText={props.onChangeText}
          onEndEditing={text => {
            filterResults(text);
            setShowResults(true);
          }}
          containerStyle={{width: 200}}
          placeholder='Category'
          rightIcon={ <Icon name='search' size={24} color='black'/> }
        />

      </View>

      {areResultsShown? (
        <View style={styles.resultsContainer}> 

          {filteredResults.map(itemString => (
            <AutocompleteItem 
              value={itemString}
            />
          ))}

        </View>
      ): null}

    </View>
  );
};

export default Autocomplete;
