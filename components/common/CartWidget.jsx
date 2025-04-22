import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export function CartWidget() {
  const router = useRouter();
  const { getTotalItems } = useContext(CartContext);
  let total = getTotalItems();
  return (
    <TouchableOpacity onPress={() => router.push("/(home)/Cart")}>
      <Ionicons name="cart-outline" size={24} color="black" />
      <Text>{total}</Text>
    </TouchableOpacity>
  );
}
