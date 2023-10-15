import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native';

function Medication(props) {
    const [isEditing, setEditing] = useState(false);

    const [notes, setNotes] = useState(props.notes == null ? "No notes yet" : props.notes);
    const [name, setName] = useState(props.name == null ? "Unnamed" : props.name);
    const [alert, setAlert] = useState(props.alert == null ? "Set time to take medication" : props.alert);
  
    const handleEditClick = () => {
      setEditing(!isEditing);
    };
  
    const handleTextChange = (newText) => {
        setNotes(newText);
        props.notes = newText;
    };

    const isMedicationInList = (name) => {
        return props.medicationsData.some((item) => item.name === name);
    };

    const handleNameTextChange = (newText) => {
        if (!isMedicationInList(newText)) {
            setName(newText);
            props.name = newText;
        }
    };

    const handleAlertTextChange = (newText) => {
        setAlert(newText);
        props.alert = newText;
    };

    return (
        <View
            style={{
                flexDirection: 'column',
                padding: 14,
                alignContent: "left",
                justifyContent: "flex-start",
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 1,
                backgroundColor: '#abdbe3',
                marginVertical: 5,
                marginHorizontal: 5
            }}>

            {isEditing ? (
            <TextInput
                style={styles.editingMedicationName}
                value={name}
                onChangeText={handleNameTextChange}
            />
            ) : (
            <Text style={styles.medication_name}>{name}</Text>
            )}

            {isEditing ? (
                <TextInput
                    style={medicationStyles.editingAlertTitle}
                    value={alert}
                    onChangeText={handleAlertTextChange}
                />
            ) : (
                <Text style={styles.alertTitle}>{alert}</Text>
            )}

            {/* <Text style={medicationStyles.alertTitle}>{props.alert}</Text> */}
            <Text style={medicationStyles.text}>Notes:</Text>

            {isEditing ? (
            <TextInput
                style={styles.textInput}
                value={notes}
                onChangeText={handleTextChange}
            />
            ) : (
            <Text style={styles.text}>{notes}</Text>
            )}
  
            <Button
            title={isEditing ? 'Save' : 'Edit'}
            onPress={handleEditClick}
            color="black"
            />

        </View>
    );
}

const CircularAddButton = ({ onPress }) => {    
    return (
      <TouchableOpacity style={styles.addButton} onPress={onPress}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    );
};

export default function Meds() {
    const [medicationsData, setMedicationsData] = useState([
        { id: 1, name: 'Adderall', alert: 'M, T, W, Th, F, Sa 9:00 a.m.', notes: 'Don\'t take on Sundays to decrease dependence, eat food within first hour!'},
        { id: 2, name: 'Vitamin D', alert: 'M, T, W, Th, F, Sa, Su 9:00 a.m.', notes: 'No side effects'},
        // { id: 3, name: 'Birth Control', alert: 'M, T, W, Th, F, Sa, Su 7:00 p.m.', notes: 'Headaches and nausea :('}
    ]);
    
    const [nextID, setNextID] = useState(medicationsData.length + 1);
    
    const addNewMedication = (props) => {
        const newMedicationItem = {
            name: props.name, 
            alert: props.alert,
            notes: props.notes,
            id: nextID
        };

        setNextID(nextID + 1);

        // Create a new array with the added item
        const newMedicationsData = [newMedicationItem, ...medicationsData];
        setMedicationsData(newMedicationsData);
    };

    const removeMedication = (name) => {
        // Filter out the medication with the specified ID
        const updatedData = medicationsData.filter((medication) => medication.name !== name);
        setMedicationsData(updatedData);
    };

    return (
        <View style={{
            backgroundColor: '#fff',
            justifyContent: 'top',
            padding: 10,
            flex: 1,
        }}>
            <View style={{
                flexDirection: 'row',
            }}>
                <Text style={styles.titleText}>My Medications</Text>
                <View style={{
                    marginVertical: 20, 
                    flex: 1
                }}>
                    <CircularAddButton onPress={addNewMedication}></CircularAddButton>
                </View>
            </View>
            <FlatList 
                data={medicationsData}
                renderItem={({ item }) => 
                    <TouchableWithoutFeedback onLongPress={() => removeMedication(item.name)}>
                        <View>
                            < Medication name={item.name} alert={item.alert} notes={item.notes} medicationsData={medicationsData}/>
                        </View>
                    </TouchableWithoutFeedback>}
                keyExtractor={(item) => item.id}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 10,
    },
    medication_name: {
        fontWeight: 'bold',
        marginVertical: 4,
    },
    editingMedicationName: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginVertical: 4,
    },
    text: {
        fontSize: 14,
        marginVertical: 4,
    },
    textInput: {
        fontSize: 14,
        fontStyle: 'italic',
        marginVertical: 4,

    },
    titleText: {
        fontSize: 34,
        fontWeight: 'bold',
        padding: 10,
        color: 'black',
        flex: 5
    },
    addButton: {
        backgroundColor: 'black', 
        width: 40,
        height: 40,
        borderRadius: 20, // Make it circular by setting borderRadius to half of the width and height
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
        addButtonText: {
        color: 'white',
        fontSize: 18.666,
        fontWeight: 'bold',
    },
  });

const medicationStyles = StyleSheet.create({
    medicationName: {
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 2,
    },
    alertTitle: {
        marginVertical: 4,
        fontSize: 16,
        marginVertical: 2,
    },
    editingAlertTitle: {
        fontStyle: 'italic',
    },
    text: {
        marginVertical: 4,
        fontSize: 14,
        marginVertical: 2,
        textDecorationLine: 'underline'
    },
});