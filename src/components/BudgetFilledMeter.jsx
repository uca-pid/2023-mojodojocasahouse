import React from "react";
import { View, Text } from "react-native";


const BudgetFilledMeter = (props) => {
  const [startPercent, setStartPercent] = React.useState(0);
  const [addedPercent, setAddedPercent] = React.useState(0);
  const [totalUsedPercent, setTotalUsedPercent] = React.useState(0);

  const isNaN = (x) => {
    return x != x;
  };

  React.useEffect(() => {
    const startAmount = parseFloat(props.startFilled);
    const limitAmount = parseFloat(props.limit);
    const addAmount = parseFloat(props.add);
    
    if(startAmount > limitAmount){
      setStartPercent("100%");
    } else {
      setStartPercent((100 * startAmount/limitAmount) + "%");
    }

    if(isNaN(addAmount)){
      setAddedPercent("0%");
      setTotalUsedPercent((100 * startAmount/limitAmount) + "%");
    }
    else if(addAmount + startAmount > limitAmount){
      const usedAmount = limitAmount - startAmount;
      setAddedPercent((100 * usedAmount/limitAmount) + "%");
      setTotalUsedPercent("100%");
    } else {
      setAddedPercent((100 * addAmount/limitAmount) + "%");
      setTotalUsedPercent((100 * (addAmount + startAmount)/limitAmount) + "%");
    }
  }, [props]);

  return(
    <View style={{height: 50, width: '100%', borderWidth: 0.5 , borderColor: '#D9D9D9', flexDirection: 'row', backgroundColor: '#faebff'}}>
      <View style={{height: '100%', width: startPercent, backgroundColor: '#e796ff'}}></View>
      <View style={{height: '100%', width: addedPercent, backgroundColor: '#eeb8ff'}}></View>
      <View style={{height: '100%', width: '100%', position: 'absolute', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 18, marginLeft: 10, color: '#343434'}}>{props.name}</Text>
        <Text style={{fontSize: 15, marginRight: 10, color: '#343434'}}>{totalUsedPercent}</Text>
      </View>
    </View>
  );
};

export default BudgetFilledMeter;
