import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MainScreen from '../screens/MainScreen';
import AboutScreen from '../screens/AboutScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: 'rgba(20, 30, 48, 0.9)', 
          borderTopWidth: 0, 
          elevation: 0,
        },
        tabBarActiveTintColor: '#00FF00', 
        tabBarInactiveTintColor: '#777', 
        headerStyle: {
          backgroundColor: 'rgba(0,0,0,0)', 
          elevation: 0, 
        },
        headerTitleStyle: {
          color: '#fff', 
        },
        headerTransparent: true, 
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'About') {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={{
          headerTitle: 'Currency Converter',
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerTitle: 'About Me', 
        }}
      />
    </Tab.Navigator>
  );
}
