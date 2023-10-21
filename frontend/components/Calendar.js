import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Calendar, LocaleConfig, CalendarList, Agenda} from 'react-native-calendars';

import MedicationByDate from './MedicationByDate';

// calendar resource: https://github.com/wix/react-native-calendars#scrollable-semi-infinite-calendar
//https://medium.com/@reactsharing.com/react-native-calendar-components-410cecb54cdf


/*
TODO:
1. Change hardcoded marked dates
2. Change hardcoded streak number
3. Refresh after switching tabs, without having to reclick date
*/


const Spacer = ({ size }) => (
    <View style={{ height: size, width: size }} />
);

export default function CalendarScreen(props) {
    const [selectedDate, setSelectedDate] = useState();
    const [medications, setMedications] = useState([]);

    useEffect(() => {
        fetchMedicationData(selectedDate);
    }, [selectedDate]);
    
    const fetchMedicationData = async (date) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/medications/${date}`);
            if (response.status === 200) {
                const data = await response.json();
                setMedications(data.medications);
            } else {
                console.error('Failed to fetch medication data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
    <View style={styles.container}>
        <Text style={styles.streak}>Streak: 2 days</Text>
        <Spacer size={10}></Spacer>
        <View style={{height:400}}>
            <CalendarList
                // Callback which gets executed when visible months change in a scroll view. Default = undefined
                onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={10}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={10}
                // Enable or disable scrolling of the calendar list
                scrollEnabled={true}
                // Enable or disable the vertical scroll indicator. Default = false
                showScrollIndicator={true}
                // Minimum date that can be selected, dates before minDate will be greyed out. Default = undefined
                minDate={'2022-11-10'}
                // Handler which gets executed on day press. Default = undefined
                onDayPress={day => {
                    console.log('doing the agenda for this day', day);
                    setSelectedDate(day.dateString);
                    fetchMedicationData(selectedDate);
                }}
                // Handler which gets executed on day-long press. Default = undefined
                onDayLongPress={day => {
                    console.log('selected day', day);
                }}
                // // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                // monthFormat={'MM 2022'}
                // Handler which gets executed when the visible month changes in the calendar. Default = undefined
                onMonthChange={month => {
                    console.log('month changed', month);
                }}
                // displayLoadingIndicator={true}
                markedDates={{
                    ['2023-10-10']: { startingDay: true, selected: true, selectedColor: 'green' },
                    ['2023-10-13']: { endingDay: true, selected: true, selectedColor: 'green' },
                    ['2023-10-14']: { endingDay: true, selected: true, marked: true, selectedColor: 'green' },
                }}
                markingType='interactive'
            />
            </View>
            <View>
                {selectedDate && medications ? (
                    <MedicationByDate
                    date={selectedDate}
                    medications={medications}
                    style={{ backgroundColor: 'white', width: '100%' }}
                    />
                ) : (
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noDataText}>No recorded data on selected day.</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    streak: {
        color: "green",
        fontSize: 25
    },
    noDataContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 120,
        paddingTop: 20,
        paddingLeft: 40
    },

});