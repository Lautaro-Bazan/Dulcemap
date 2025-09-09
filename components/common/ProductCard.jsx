import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export function ProductCard(props) {
  const { image, title, price, description, id, style,  } = props;
  const router = useRouter();
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={() => router.push(`/ItemDetail/${id}`)}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>$ {price}</Text>
      <Text>{description}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    width: 150, // Ancho fijo o relativo
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,

    // Propiedades de sombra para iOS
    shadowColor: "#000", // Color de la sombra
    shadowOffset: { width: 0, height: 3 }, // Dirección de la sombra
    shadowOpacity: 0.1, // Opacidad de la sombra
    shadowRadius: 5, // Difusión de la sombra

    // Propiedad de sombra para Android
    elevation: 3, // Altura de la sombra
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 5,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 14,
  },
});
