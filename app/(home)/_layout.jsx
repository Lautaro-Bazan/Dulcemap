import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="prueba" />
      <Stack.Screen name="ItemDetail" />
      <Stack.Screen name="Cart" />
    </Stack>
  );
}
