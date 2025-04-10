import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export function Counter({ cantidad, setCantidad }) {
  // Asegúrate de usar las props correctamente
  const sumar = () => {
    setCantidad(cantidad + 1);
  };

  const restar = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={restar}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.counter}>{cantidad}</Text>
      <TouchableOpacity style={styles.button} onPress={sumar}>
        <Text style={styles.buttonText}>+</Text>
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
