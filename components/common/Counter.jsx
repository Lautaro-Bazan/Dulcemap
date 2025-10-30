import { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CartContext } from "../context/CartContext";

export function Counter({ cantidad, setCantidad, item }) {
  const { addToCart } = useContext(CartContext);

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
    const objetoParaElCarrito = { ...item, quantity: cantidad };
    addToCart(objetoParaElCarrito);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={restar}>
          <Text style={styles.textButton}>-</Text>
        </TouchableOpacity>

        <Text style={styles.counter}>{cantidad}</Text>

        <TouchableOpacity style={styles.button} onPress={sumar}>
          <Text style={styles.textButton}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onAdd} style={styles.addButton}>
        <Text style={styles.addButtonText}>Agregar al carrito</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 50,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  button: {
    width: 35,
    height: 35,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    fontSize: 22,
    fontWeight: "bold",
  },
  counter: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
    marginHorizontal: 20,
    minWidth: 25,
    textAlign: "center",
  },
  addButton: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 10,
    backgroundColor: "#9460b9ff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
