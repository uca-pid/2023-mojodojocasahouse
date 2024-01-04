import { View, Text, TouchableOpacity } from "react-native";

const HelperLink = ({ label, highlightedText, onPress }) => {
  return (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 10,
    }}
  >
    { label ? (
      <Text
        style={{
          color: 'black',
        }}
      >{label + " "}</Text>) : null
    }

    <TouchableOpacity onPress={onPress}>
      <Text style={{ color: '#E86DC3', fontWeight: '700' }}>{highlightedText}</Text>
    </TouchableOpacity>
  </View>
  );
};

export default HelperLink;
