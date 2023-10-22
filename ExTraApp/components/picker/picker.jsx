import React from "react";
import { Modal, View, ScrollView, TouchableOpacity, Text } from "react-native";

import defaultStyles from './style';
import { Icon } from "@rneui/themed";

const defaultIcons = [
  {value: 1, iconName: "aircraft", iconType: "entypo"},
  {value: 2, iconName: "drink", iconType: "entypo"},
  {value: 3, iconName: "key", iconType: "entypo"},
  {value: 4, iconName: "shopping-cart", iconType: "entypo"},
  {value: 5, iconName: "clapperboard", iconType: "entypo"},
  {value: 6, iconName: "squared-plus", iconType: "entypo"},
  {value: 7, iconName: "man", iconType: "entypo"},
  {value: 8, iconName: "open-book", iconType: "entypo"},
];

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

const PickerText = (props) => {
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

const PickerIcon = ({onPress, iconName, iconType, selected}) => {
  return (
    <TouchableOpacity style={selected? defaultStyles.selectedIconContainer: defaultStyles.unselectedIconContainer} onPress={onPress}>
      <Icon 
        style={selected? defaultStyles.selectedIcon: defaultStyles.unselectedIcon} 
        name={iconName} 
        type={iconType} 
        size={40}
      />
    </TouchableOpacity>
  );
};

const PickerSingleIcon = (props) => {
  const placeholderRef = React.useRef(null);
  if(placeholderRef.current == null){
    placeholderRef.current = (props.placeholder || {value: null, iconName: "credit", iconType: "entypo"})
  }

  const handleDone = () => {
    props.onDone();
  };

  const handleRequestClose = () => {
    props.onCancel();
  };


  return (
    <>
    <Modal
      visible={props.visible}
      animationType="none"
      transparent={true}
      onRequestClose={handleRequestClose}
    >
      <View style={defaultStyles.backgroundView} />

      <View style={defaultStyles.categoryModalContainer}>

        <View style={defaultStyles.scrollviewContainer}>
          <ScrollView 
            style={defaultStyles.scrollviewIconsStyle}
            contentContainerStyle={defaultStyles.scrollviewIconsContainer}
          >
            <PickerIcon 
              key={0}
              onPress={() => props.onChange(placeholderRef.current)}
              iconName={placeholderRef.current.iconName}
              iconType={placeholderRef.current.iconType}
              selected={props.value.value == placeholderRef.current.value}
            />
            
            {props.data? (
              props.data.map((iconItem, index) => (
                <PickerIcon 
                  key={index}
                  onPress={() => props.onChange(iconItem)}
                  iconName={iconItem.iconName}
                  iconType={iconItem.iconType}
                  selected={props.value.value == iconItem.value}
                />
              ))
            ) : (
              defaultIcons.map((iconItem, index) => (
                <PickerIcon 
                  key={index}
                  onPress={() => props.onChange(iconItem)}
                  iconName={iconItem.iconName}
                  iconType={iconItem.iconType}
                  selected={props.value.value == iconItem.value}
                />
              ))
            )}
          </ScrollView>
        </View>

        <DoneButton 
          onPress={handleDone}
        />

      </View>
    </Modal>
    </>
  );
};

Picker.Text = PickerText;

Picker.Icon = PickerSingleIcon

export { Picker };
