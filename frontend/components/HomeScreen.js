import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import ChoiceChip from './ChoiceChip';

export default function HomeScreen() {
    const [medications, setMedications] = useState([
        "Adderall",
        "Vitamin D",
        "Birth Control"
      ]);
    
      const [newMedication, setNewMedication] = useState('');
      const [selectedChips, setSelectedChips] = useState(
        Array(medications.length+1).fill('')
      );

    const handleSelect = (index, label) => {
        const newSelectedChips = [...selectedChips];
        newSelectedChips[index] = label;
        setSelectedChips(newSelectedChips);
    };

    const addMedication = () => {
        if (newMedication.trim() !== '') {
          setMedications([...medications, newMedication]);
          setSelectedChips([...selectedChips, '']);
          setNewMedication('');
        }
      };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Today's Medicine</Text>
                <Text style={styles.dateText}>{new Date().toDateString()}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollableContainer}>
                <View>
                    {medications.map((medication, index) => (
                        <View style={styles.medicine} key={index}>
                            <ChoiceChip
                                label="Taken"
                                selected={selectedChips[index] === 'Taken'}
                                onSelect={() => handleSelect(index, 'Taken')}
                            />
                            <ChoiceChip
                                label="Skipped"
                                selected={selectedChips[index] === 'Skipped'}
                                onSelect={() => handleSelect(index, 'Skipped')}
                            />
                            <View style={styles.medicationNameContainer}>
                                <Text style={styles.medicineText}>{medication}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.medicine}>
                    <ChoiceChip
                        label="Taken"
                        selected={selectedChips[medications.length + 1] === 'Taken'}
                        onSelect={() => handleSelect(medications.length + 1, 'Taken')}
                    />
                    <ChoiceChip
                        label="Skipped"
                        selected={selectedChips[medications.length + 1] === 'Skipped'}
                        onSelect={() => handleSelect(medications.length + 1, 'Skipped')}
                    />
                    <TextInput
                    style={
                        styles.addMedicationInput
                    }
                    placeholder="Add a new medicine"
                    value={
                        newMedication
                    }
                    onChangeText={
                        (text) => setNewMedication(text)
                    }
                    onSubmitEditing={
                        addMedication
                    }
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
    },
    titleContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 120,
        paddingTop: 20,
        paddingLeft: 40
    },
    titleText: {
        fontSize: 30,
        color: '#000',
        fontWeight: 'bold',
    },
    scrollableContainer: {
        flexGrow: 1,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 20,
    },
    dateText: {
        fontSize: 15,
        color: '#777',
    },
    medicine: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
    },
    medicationNameContainer: {
        flexWrap: 'wrap',
        width: 190,
        flexDirection: 'row',
    },
    medicineText: {
        paddingLeft: 10,
        fontSize: 18,
        color: '#000',
    },
    medicineAddText: {
        paddingLeft: 10,
        fontSize: 18,
        color: '#BBB',
        textDecorationLine: 'underline'
    },
    addMedicationInput: {
        flex: 1,
        height: 40,
        paddingLeft: 10,
    },
    addButton: {
        marginLeft: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007BFF',
    },
        addButtonText: {
        color: 'white',
        fontSize: 16,
    },
  });