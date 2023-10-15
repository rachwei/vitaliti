import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Calendar, LocaleConfig, CalendarList, Agenda} from 'react-native-calendars';

import MedicationByDate from './MedicationByDate';

// calendar resource: https://github.com/wix/react-native-calendars#scrollable-semi-infinite-calendar
//https://medium.com/@reactsharing.com/react-native-calendar-components-410cecb54cdf

const Spacer = ({ size }) => (
    <View style={{ height: size, width: size }} />
);

// hard coded medications
const medications = [
    {"name": "Vitamin D", "status": "Took"},
    {"name": "Vitamin C", "status": "Missed"},
    {"name": "Zinc", "status": "Missed"},
    {"name": "Adderall", "status": "Took"},
    {"name": "Birth Control", "status": "Missed"},
]

export default function CalendarScreen(props) {
    const [selectedDate, setSelectedDate] = useState("2023-10-24");

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
            {selectedDate && 
                <MedicationByDate date={selectedDate} medications={medications} style={{"backgroundColor":"white", wdith: "100%"}}></MedicationByDate>
            }
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
    }
});