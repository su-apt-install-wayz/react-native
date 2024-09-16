import { Stack } from "expo-router";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppProvider from './store';
import HomeScreen from '../components/navigation/HomeScreen';
import CartScreen from '../components/CartScreen';

export default function RootLayout() {

  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
