import React, { useContext } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons"; // Cambiado a Feather para consistencia
import { useRouter } from "expo-router";
import { CartContext } from "../context/CartContext"; // Asegúrate que esta ruta sea correcta

export function CartWidget() {
  const router = useRouter();
  // Usamos 'cart' para ser consistentes con tu archivo Cart.jsx
  const { cart } = useContext(CartContext);

  // Calculamos el número total de ítems sumando las cantidades
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const goToCart = () => {
    // --- ¡ESTA ES LA CORRECCIÓN! ---
    // La ruta es /Cart, (coincide con el nombre de archivo app/Cart.jsx)
    router.push("/Cart");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={goToCart}>
      {/* Usamos el icono de Feather para mantener el estilo */}
      <Feather name="shopping-cart" size={26} color="#333" />
      {totalItems > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalItems}</Text>
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

