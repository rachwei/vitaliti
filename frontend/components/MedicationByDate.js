import { StyleSheet, Text, View } from 'react-native';

function MedComponent(props) {
    const status = props.status
    const meds = props.medications

    const taken = meds.filter(med => med.status === "Took").map(result => result.name)
    const skipped = meds.filter(med => med.status === "Skipped").map(result => result.name)
    const missed = meds.filter(med => med.status === "Missed").map(result => result.name)

    return (
        <View style={styles.medlist}>
            <View style={styles.took}>
                <Text style={styles.bolded}>Taken</Text>
                <View style={{ height: 10, width: 10 }} />
                {taken.map(name => <Text key={name}>{name}</Text>)}
            </View>
            <View style={{ height: 10, width: 10 }} />
            {/* <View style={styles.skipped}>
                <Text style={styles.bolded}>Skipped</Text>
                <View style={{ height: 10, width: 10 }} />
                {skipped.map(name => <Text key={name}>{name}</Text>)}
            </View>
            <View style={{ height: 10, width: 10 }} />
            <View style={styles.missed}>
                <Text style={styles.bolded}>Missed</Text>
                <View style={{ height: 10, width: 10 }} />
                {missed.map(name => <Text key={name}>{name}</Text>)}
            </View> */}
        </View>
    )
}

export default function MedicationByDate(props) {
    const current_date = props.date
    const medications = props.medications

    return (
        <View style={styles.container}>
            <Text style={{"fontSize": 25, "fontWeight": "bold"}}>{current_date}</Text>
            <View style={{ height: 20, width: 10 }} />
            <MedComponent medications={medications} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
    },
    medlist: {
        textAlign: 'center',
        justifyContent: 'center',
    },
    bolded: {
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
    },
    took: {
        backgroundColor: '#D1F8D1',
        width: 300,
        padding: 20,
    },
    skipped: {
        backgroundColor: '#B9D9EB',
        width: 300,
        padding: 20,
    },
    missed: {
        backgroundColor: '#EBB8B7',
        width: 300,
        padding: 20,
    }
  });