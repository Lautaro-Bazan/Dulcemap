import { Stack } from "expo-router";
import { CartContextProvider } from "../components/context/CartContext";

export default function RootLayout() {
  return (
    <CartContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        
        {/* RUTAS PRINCIPALES */}
        <Stack.Screen name="index" />                   {/* app/index.jsx (Login) */}
        <Stack.Screen name="register" />                {/* ¡NUEVA! app/register.jsx (Registro) */}
        <Stack.Screen name="(tabs)" />                  {/* app/(tabs)/ (Tu app principal) */}
        
        {/* PANTALLAS DEL STACK */}
        <Stack.Screen name="Cart" />                    {/* app/Cart.jsx */}
        <Stack.Screen name="ItemDetail/[id]" />         {/* app/ItemDetail/[id].jsx */}
        <Stack.Screen name="ItemsCarpa/[name]" />       {/* app/ItemsCarpa/[name].jsx */}
        <Stack.Screen name="MisCupones" />              {/* app/MisCupones.jsx */}
        <Stack.Screen name="MisPedidos" />              {/* app/MisPedidos.jsx */}
        <Stack.Screen name="Perfil" />                  {/* app/Perfil.jsx */}
        
        {/* PANTALLA DE ADMIN (con header visible) */}
        <Stack.Screen
          name="admin"
          options={{
            title: "Panel de Admin",
            headerShown: true,
          }}
        />
        
      </Stack>
    </CartContextProvider>
  );
}
