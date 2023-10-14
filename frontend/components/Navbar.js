import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


import Calendar from './Calendar'
import HomeScreen from './HomeScreen'
import Meds from './Meds'

const Tab = createBottomTabNavigator();

export default function Navbar() {
  return (
    // <Text>Hello</Text>
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
                iconName = 'ios-home'
            } else if (route.name === 'Meds') {
                iconName = 'ios-medkit'
            } else if (route.name === "Calendar") {
                iconName = "ios-calendar"
            }

            return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
        })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Meds" component={Meds} />
    </Tab.Navigator>
  );
}