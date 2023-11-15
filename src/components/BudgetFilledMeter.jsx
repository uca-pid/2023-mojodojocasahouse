import React from "react";
import { View, Text } from "react-native";


const BudgetFilledMeter = (props) => {
  return(
    <View>
      <Text>Budget: {props.name}</Text>
      <Text>I start filled {props.startFilled}</Text>
      <Text>You added {props.add}</Text>
    </View>
  );
};

export default BudgetFilledMeter;
