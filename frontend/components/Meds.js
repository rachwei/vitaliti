import { StyleSheet, Text, View } from 'react-native';

export default function Meds() {
    return (
        <View style={styles.container}>
            <Text>Meds</Text>
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
  });