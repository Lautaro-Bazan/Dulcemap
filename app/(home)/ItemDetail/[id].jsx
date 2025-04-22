import { View, Text, Image, StyleSheet, StatusBar } from "react-native";
import { useEffect, useState } from "react";
import { products } from "../../products";
import { useLocalSearchParams } from "expo-router";
import { Counter } from "../../../components/common/Counter";

export default function id() {
  const { id } = useLocalSearchParams();

  const [item, setItem] = useState(null);
  const [cantidad, setCantidad] = useState(1); // Estado para la cantidad
  const [totalAPagar, setTotalAPagar] = useState(0); // Estado para el total

  useEffect(() => {
    let productSelected = products.find((product) => product.id === id);
    setItem(productSelected || null);
  }, [id]);

  // Actualiza el total cada vez que la cantidad o el precio cambien
  useEffect(() => {
    if (item) {
      setTotalAPagar(cantidad * item.price);
    }
  }, [cantidad, item]);

  if (!item) {
    return <Text>Producto no encontrado o cargando...</Text>;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Image style={styles.imageProduct} source={{ uri: item.imageUrl }} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.seccionPago}>
        {/* Pasa la cantidad y setCantidad al componente Counter */}
        <Counter cantidad={cantidad} setCantidad={setCantidad} item={item} />
        <Text style={styles.total}>${totalAPagar}</Text>
      </View>
    </View>
  );
}

// estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  imageProduct: {
    marginTop: 10,
    width: "100%",
    height: 260,
    borderRadius: 5,
    marginBottom: 10, // Asegura espacio entre imagen y texto
  },
  info: {
    padding: 10, // Ajusta espacio interno
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  seccionPago: {
    flexDirection: "row",
  },
});
