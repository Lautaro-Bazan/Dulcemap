import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(home)/Cart" />
      <Stack.Screen name="(home)/ItemDetail/[id]" />
      <Stack.Screen name="(home)/ItemsCarpa/[name]" />
    </Stack>
  );
}
