import { View, Text, StyleSheet } from "react-native";

export default function descuentos() {
  return (
    <View style={styles.container}>
      <Text>descuentos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  card: {
    flexDirection: "row", // Elementos en fila
    backgroundColor: "#f9f9f9",
    borderRadius: 10, // Bordes redondeados
    marginBottom: 15, // Espacio entre tarjetas
    padding: 10, // Espaciado interno
    shadowColor: "#000", // Sombra
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Elevación para Android
  },
  imageProduct: {
    width: "30%", // Imagen ocupa el 30% del ancho de la tarjeta
    height: 80, // Altura fija
    borderRadius: 5,
  },
});
