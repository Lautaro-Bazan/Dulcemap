import { Stack } from "expo-router";
// ⚠️ ¡IMPORTANTE! Asegúrate de que esta importación sea correcta
// Si tu CartContext exporta con 'export const', usa llaves { }
// Si exporta con 'export default', no uses llaves
import { CartContextProvider } from "../components/context/CartContext";

export default function RootLayout() {
  return (
    <CartContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        
        {/* RUTAS PRINCIPALES */}
        <Stack.Screen name="index" />                   {/* app/index.jsx (Login) */}
        <Stack.Screen name="register" />                {/* app/register.jsx (Registro) */}
        <Stack.Screen name="(tabs)" />                  {/* app/(tabs)/ (Tu app principal) */}
        
        {/* --- ¡ESTE ES EL CAMBIO! --- */}
        {/* Esta línea reemplaza a 'carpa-dashboard' */}
        {/* Apunta a la carpeta app/(carpa) que tiene su propio layout de pestañas */}
        <Stack.Screen name="(carpa)" />                 

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

