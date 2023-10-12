import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

const CategorySelectionModal = ({ isVisible, onClose, onSelectCategory, categories, categoryFilter }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
    >
      <View>
        <Text>Choose a Category</Text>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onSelectCategory(category.value)}
          >
            <Text style={{ color: category.value === categoryFilter ? 'blue' : 'black' }}>
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={onClose}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CategorySelectionModal;