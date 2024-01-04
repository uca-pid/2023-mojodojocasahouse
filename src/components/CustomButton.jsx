import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function CustomButton({label, onPress, style}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#e86dc3',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        ...style
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
