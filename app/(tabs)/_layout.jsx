import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="descuentos"
        options={{
          tabBarLabel: "Descuentos",
          tabBarIcon: ({ color, size }) => (
            <Feather name="percent" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="mapa"
        options={{
          tabBarLabel: "Mapa",
          tabBarIcon: ({ color, size }) => (
            <Feather name="map-pin" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="eventos"
        options={{
          tabBarLabel: "Eventos",
          tabBarIcon: ({ color, size }) => (
            <Feather name="speaker" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="usuario"
        options={{
          tabBarLabel: "Usuario",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
