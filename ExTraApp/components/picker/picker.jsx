import React from "react";
import { Modal, View, ScrollView, TouchableOpacity, Text } from "react-native";

import defaultStyles from './style';

const DoneButton = ({onPress}) => {
  return (
    <View style={defaultStyles.cancelButtonContainer}>
      <TouchableOpacity style={defaultStyles.categoryCancelButton} onPress={onPress}>
        <Text style={defaultStyles.categoryCancelText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const PickerItem = ({onPress, itemLabel, selected}) => {

  return (
    <TouchableOpacity style={selected? defaultStyles.selectedItemContainer: defaultStyles.unselectedItemContainer} onPress={onPress}>
      <Text style={selected? defaultStyles.selectedItemText: defaultStyles.unselectedItemText}>{itemLabel}</Text>
    </TouchableOpacity>
  );
};

const Picker = (props) => {
  return;
};

const PickerSingle = (props) => {
  const placeholderRef = React.useRef(null);
  if(placeholderRef.current == null){
    placeholderRef.current = (props.placeholder || {value: null, label: "Choose an option..."})
  }

  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(placeholderRef.current);

  const toggleCategoryModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleItemSelection = (item) => {
    // Set selected Item
    setSelectedItem(item);

    // Change value
    props.onChange(item.value);
  };

  const closeModal = () => {
    // Togle modal
    toggleCategoryModal();

    // Call onClose if callback exists
    if (props.onClose){
      props.onClose();
    }
  };


  return (
    <>
    <TouchableOpacity style={defaultStyles.button} onPress={toggleCategoryModal}>
      <Text style={defaultStyles.buttonText}>
        {selectedItem.inputLabel || selectedItem.label}
      </Text>
    </TouchableOpacity>

    <Modal
      visible={modalVisible}
      animationType="none"
      transparent={true}
      onRequestClose={closeModal}
    >
      <View style={defaultStyles.backgroundView} />

      <View style={defaultStyles.categoryModalContainer}>

        <View style={defaultStyles.scrollviewContainer}>
          <ScrollView 
            style={defaultStyles.scrollviewStyle}
          >
            <PickerItem 
              key={0}
              onPress={() => handleItemSelection(placeholderRef.current)}
              itemLabel={placeholderRef.current.label}
              selected={selectedItem.value == placeholderRef.current.value}
            />
            
            {props.data.map((item, index) => (
              <PickerItem 
                key={index}
                onPress={() => handleItemSelection(item)}
                itemLabel={item.label}
                selected={selectedItem.value == item.value}
              />
            ))}
          </ScrollView>
        </View>

        <DoneButton 
          onPress={closeModal}
        />

      </View>
    </Modal>
    </>
  );
};

Picker.Single = PickerSingle;

export { Picker };
