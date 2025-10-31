import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function CarpaLayout() {
  // Este layout crea un navegador de pestañas (Tabs)
  // específico para el administrador de la carpa.
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Ocultamos el header de las pestañas
        tabBarActiveTintColor: "#9460b9ff", // Color principal
      }}
    >
      <Tabs.Screen
        name="pedidos" // Coincide con el archivo app/(carpa)/pedidos.jsx
        options={{
          title: "Pedidos Pendientes",
          tabBarIcon: ({ color, size }) => (
            <Feather name="clipboard" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="productos" // Coincide con el archivo app/(carpa)/productos.jsx
        options={{
          title: "Mis Productos",
          tabBarIcon: ({ color, size }) => (
            <Feather name="archive" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}