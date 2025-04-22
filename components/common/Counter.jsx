import { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { CartContext } from "../context/CartContext";

export function Counter({ cantidad, setCantidad, item }) {
  const { addToCart } = useContext(CartContext);
  // Asegúrate de usar las props correctamente
  const sumar = () => {
    if (cantidad < item.stock) {
      setCantidad(cantidad + 1);
    }
  };
  const restar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };
  const onAdd = () => {
    let objetoParaElCarrito = { ...item, quantity: cantidad };

    addToCart(objetoParaElCarrito);
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={restar}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.counter}>{cantidad}</Text>
        <TouchableOpacity style={styles.button} onPress={sumar}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onAdd}>
        <Text>Agregar al carrito</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center", // Centra el diseño horizontalmente
    alignItems: "center", // Asegura que los elementos estén alineados
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 1, // Borde fino
    borderColor: "#ccc", // Color gris claro para el borde
    borderRadius: 40, // Bordes redondeados
    padding: 5, // Espaciado interno del borde
    backgroundColor: "#fff", // Fondo blanco detrás del contador
    alignSelf: "center",
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25, // Botones circulares
    justifyContent: "center", // Centra el contenido dentro del botón
    alignItems: "center",
    marginHorizontal: 10, // Espacio entre botones y contador
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000", // Texto negro
  },
  counter: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 20, // Espacio entre los botones y el número
  },
});
