import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export function CartWidget() {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push("/(home)/Cart")}>
      <Ionicons name="cart-outline" size={24} color="black" />
    </TouchableOpacity>
  );
}
