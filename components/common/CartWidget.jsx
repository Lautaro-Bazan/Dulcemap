import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export function CartWidget() {
  const router = useRouter();
  const { getTotalItems } = useContext(CartContext);
  let total = getTotalItems();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push("/(home)/Cart")}
    >
      <Ionicons name="cart-outline" size={28} color="black" />
      {total > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{total}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    padding: 5,
  },
  badge: {
    position: "absolute",
    right: 0,
    top: -2,
    backgroundColor: "red",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

