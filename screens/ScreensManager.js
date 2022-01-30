import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './HomeScreen';
import NewsScreen from './NewsScreen';
import WatchlistScreen from './WatchlistScreen';
import ProfileScreen from './ProfileScreen';
import React from 'react';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator initialRouteName="Home" activeColor="#e91e63" barStyle={{ backgroundColor: 'tomato' }}>
            <Tab.Screen name="Home" component={HomeScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
            }}
            />
            <Tab.Screen name="News" component={NewsScreen}
            options={{
                tabBarLabel: 'News',
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="bell" color={color} size={26} />
                ),
            }}
            />
            <Tab.Screen name="Watchlist" component={WatchlistScreen}
            options={{
                tabBarLabel: 'Watchlist',
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="clipboard-list" color={color} size={26} />
                ),
            }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen}
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={26} />
                ),
            }}
            />
      </Tab.Navigator>
    );
  }


const ScreensManager = () => {
  return (
      <MyTabs />
  );
};

export default ScreensManager;

const styles = StyleSheet.create({});
