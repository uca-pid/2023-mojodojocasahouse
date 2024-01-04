import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text } from "react-native"

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={{
      backgroundColor: 'grey',
      borderRadius: 5,
      padding: 10,
      alignItems: 'center',
      marginTop: 20,
    }} onPress={() => navigation.goBack()}>
      <Text style={{
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      }}>Back</Text>
    </TouchableOpacity>
  );
};

export default BackButton;
