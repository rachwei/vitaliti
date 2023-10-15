import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ChoiceChip = ({ label, selected, onSelect }) => {
  return (
    <TouchableOpacity 
      style={[styles.chip, selected ? styles.selectedChip : null]} 
      onPress={onSelect}
    >
      <Text style={styles.chipText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    margin: 5,
  },
  selectedChip: {
    backgroundColor: '#ddd',
  },
  chipText: {
    color: '#000',
  },
});

export default ChoiceChip;
