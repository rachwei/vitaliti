import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function HomeScreen() {
    return "Home Screen";
}

function SettingsScreen() {
    return "Home Screen";
}

function Navbar() {
  return (
    <p>hello</p>
    // <Tab.Navigator>
    //   <Tab.Screen name="Home" component={HomeScreen} />
    //   <Tab.Screen name="Settings" component={SettingsScreen} />
    // </Tab.Navigator>
  );
}

export default Navbar;