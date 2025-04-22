import { Stack } from "expo-router";
import { CartContextProvider } from "../components/context/CartContext";
export default function RootLayout() {
  return (
    <CartContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(home)/Cart" />
        <Stack.Screen name="(home)/ItemDetail/[id]" />
        <Stack.Screen name="(home)/ItemsCarpa/[name]" />
      </Stack>
    </CartContextProvider>
  );
}
