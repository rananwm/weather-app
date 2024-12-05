import React from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/Home';
import WeatherDetails from '@/screens/WeatherDetails/WeatherDetails';
import Settings from '@/screens/Settings/Settings';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import {COLORS} from '@/constants';
import {Ionicons, MaterialIcons} from '@expo/vector-icons'; // Importing icons from Expo Vector Icons

// Ignore non-serializable value warnings
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state ',
]);

const Tabs = AnimatedTabBarNavigator();
const Stack = createNativeStackNavigator(); // Create Stack navigator

const TabsNav = () => (
  <Tabs.Navigator
    tabBarOptions={{
      activeTintColor: COLORS.gradientEnd,
      inactiveTintColor: 'white',
    }}
    appearance={{
      tabBarBackground: COLORS.gradientStart + 'BB',
      dotCornerRadius: 0,
      shadow: true,
      floating: true,
    }}>
    <Tabs.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <Ionicons name="home" size={size} color={color} /> // Home icon
        ),
      }}
    />
    <Tabs.Screen
      name="Settings"
      component={Settings}
      options={{
        tabBarIcon: ({color, size}) => (
          <MaterialIcons name="settings" size={size} color={color} /> // Settings icon
        ),
      }}
    />
  </Tabs.Navigator>
);

// Main AppNavigator with Stack and Tab Navigation
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeTabs"
          component={TabsNav}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WeatherDetails"
          component={WeatherDetails}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
