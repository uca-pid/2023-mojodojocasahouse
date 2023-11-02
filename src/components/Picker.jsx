import React from "react";
import { Modal, View, ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";

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
  const [modalVisible, setModalVisible] = React.useState(false);

  const toggleCategoryModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleItemSelection = (item) => {
    // Change value
    props.onChange(item);
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
        Category: {props.value || "Any"}
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
              onPress={() => handleItemSelection(null)}
              itemLabel={"Choose a category"}
              selected={props.value == null}
            />
            
            {props.data.map((item, index) => (
              <PickerItem 
                key={index + 1}
                onPress={() => handleItemSelection(item)}
                itemLabel={item}
                selected={props.value == item}
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

const PickerTextMultiple = (props) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const toggleCategoryModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleItemSelection = (item) => {
    let newItems;

    // this = true -> Deletion; this = false -> Addition
    if(props.value.includes(item)){

      // Check if its the only item in it
      // If true, replace it for placeholder
      if(props.value.length == 1){
        props.onChange([]);
      }
      else{
        newItems = props.value.filter((existingItems) => existingItems != item);
        props.onChange(newItems);
      }
    }
    else{
      newItems = [...props.value, item];
      props.onChange(newItems);
    }
  };

  return (
    <>
    <TouchableOpacity style={defaultStyles.button} onPress={toggleCategoryModal}>
      <Text style={defaultStyles.buttonText}>
        Categories selected: {props.value.length || "All"}
      </Text>
    </TouchableOpacity>

    <Modal
      visible={modalVisible}
      animationType="none"
      transparent={true}
      onRequestClose={toggleCategoryModal}
    >
      <View style={defaultStyles.backgroundView} />

      <View style={defaultStyles.categoryModalContainer}>

        <View style={defaultStyles.scrollviewContainer}>
          <ScrollView 
            style={defaultStyles.scrollviewStyle}
          >
            
            {props.data.map((item, index) => (
              <PickerItem 
                key={index}
                onPress={() => handleItemSelection(item)}
                itemLabel={item}
                selected={props.value.includes(item)}
              />
            ))}
          </ScrollView>
        </View>

        <DoneButton 
          onPress={toggleCategoryModal}
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
                  key={index + 1}
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

Picker.Icon = PickerSingleIcon;

const defaultStyles = StyleSheet.create({

  // Selector

  button: {
      backgroundColor: '#E86DC3',
      borderWidth: 1,
      borderColor: 'black',
      paddingBottom: '2.5%',
      paddingTop: '2.5%',
      alignItems: 'center',
      marginTop: 5,
      borderRadius: 10,
  },

  buttonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
  },

  iconButton: {
      width: 55,
      padding: 10,
      height: 'auto',
      backgroundColor: '#d9d9d9',
  },



  // Modal background

  backgroundView: {

      width: '100%',
      height: '100%',
      backgroundColor: '#d9d9d9',
      opacity: 0.7,
  },

  categoryModalContainer: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',

      height: '50%',
      width: '70%',

      top: '25%',
      left: '15%',

      backgroundColor: '#ffffff',
      borderWidth: 0.5,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      
      elevation: 9,
  },





  // ScrollView Content Container

  scrollviewContainer: {
      display: 'flex',
      flexDirection: 'column',

      height: '75%',
      width: '100%',

  },

  scrollviewStyle: {

      height: 30,

      backgroundColor: '#d9d9d9',
      borderWidth: 0.5,
      borderColor: '#a1a1a1'
  },

  scrollviewIconsStyle: {

      backgroundColor: '#d9d9d9',
      borderWidth: 0.5,
      borderColor: '#a1a1a1'
  },

  scrollviewIconsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',

      justifyContent: 'center',
      alignItems: 'center',

      backgroundColor: '#efefef',
  },

  cancelButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',

      marginTop: '10%',
      height: '15%',
      
  },

  categoryCancelButton: {
      display: 'flex',
      flexDirection: 'row',

      borderRadius: 8,
      height: '100%',
      width: '80%',
      backgroundColor: '#E86DC3',

      justifyContent: 'center',
      alignItems: 'center'
  },

  categoryCancelText: {
      color: 'white',
      fontSize: 25,
      fontFamily: 'Tahoma,Verdana,Segoe,sans-serif'
  },






  // Items

  unselectedItemContainer: {
      flexDirection: 'row',

      height: 30,
      borderBottomWidth: 1,
      borderBottomColor: '#a1a1a1',
      backgroundColor: '#ffffff',

      justifyContent: 'center',
      alignItems: 'center',
  },

  selectedItemContainer: {
      flexDirection: 'row',

      height: 30,
      borderBottomWidth: 1,
      borderBottomColor: '#a1a1a1',
      backgroundColor: '#f7bae5',

      justifyContent: 'center',
      alignItems: 'center',
  },

  unselectedItemText: {
      color: '#363636',
  },

  selectedItemText: {
      color: '#363636',
  },
  

  

  // Icons

  selectedIconContainer: {
      justifyContent: 'center',
      alignItems: 'center',

      padding: 10,

      backgroundColor: '#e3ffd1',
      borderWidth: 0.5,
      borderColor: 'rgba(2, 204, 42, 1)',
      // backgroundColor: 'red',
  },

  unselectedIconContainer: {
      justifyContent: 'center',
      alignItems: 'center',

      padding: 10,

      borderWidth: 0.5,
      borderColor: '#efefef',
      // backgroundColor: 'green'
  },

  unselectedIcon: {
      color: '#363636',
  },

  selectedIcon: {
      color: '#363636',
  },
});


export { Picker, PickerTextMultiple };
