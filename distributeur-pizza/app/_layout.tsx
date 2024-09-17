import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name="index" />
      <Stack.Screen name="liste_pizzas" />
      <Stack.Screen options={{ headerShown: false }} name="cart" />
    </Stack>
  );
}
