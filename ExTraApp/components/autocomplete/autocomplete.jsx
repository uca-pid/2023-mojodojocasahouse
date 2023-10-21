import React from "react";
import { Pressable, View, Text } from "react-native";
import { Input, Icon } from "@rneui/themed";
import styles from "./styles";

/**
 * ```data``` prop should be passed as an array of strings.
 */
const Autocomplete = props => {
  const [areResultsShown, setShowResults] = React.useState(false);
  const [filteredResults, setFilteredResults] = React.useState([]);

  const AutocompleteItem = itemProps => {
    const handlePress = () => {
      props.onChangeText(itemProps.value);
      setShowResults(false);
    };

    return (
      <Pressable style={styles.itemContainer} onPress={handlePress}>
        <Text style={styles.itemText}>{itemProps.value}</Text>
      </Pressable>
    );
  };

  const filterResults = (text) => {
    // If value is empty do not even filter
    if (text == ''){
      setFilteredResults([]);
      setShowResults(false);
      return;
    }

    // If value != empty, filter
    let filteredResults = props.data.filter((item) => {
      return item.toLowerCase().startsWith(text.toLowerCase());
    }).slice(0, 3);
    setFilteredResults(filteredResults);
    
    // If filter results are empty, do not even show them
    if(filteredResults.length == 0){
      setShowResults(false);
      return;
    }
    setShowResults(true);
  };

  return(
    <View style={styles.componentContainer}>

      <View style={styles.inputContainer}>

        <Input 
          value={props.value}
          onChangeText={text => {
            props.onChangeText(text);
            filterResults(text);
          }}
          onEndEditing={() => setShowResults(!areResultsShown)}
          placeholder={props.placeholder || "Type something..."}
          leftIcon={ <Icon name='filter' type="material-community" size={24} color='black'/> }
          maxLength={49}
        />

      </View>

      {areResultsShown? (
        <View style={styles.resultsContainer}> 

          <View style={styles.resultItemsContainer}></View>

          {filteredResults.map((itemString, index) => (
            <AutocompleteItem 
              key={index}
              value={itemString}
            />
          ))}

        </View>
      ): null}
    </View>
  );
};

export default Autocomplete;
