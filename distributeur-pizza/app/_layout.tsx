import { Stack } from "expo-router";
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen options={{ headerShown: false }} name="index" />
        <Stack.Screen options={{ headerShown: false }} name="pizzas" />
        <Stack.Screen options={{ headerShown: false }} name="cart" />
      </Stack>
    </Provider>
  );
}
