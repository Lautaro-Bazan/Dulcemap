import { View, Text, Image, StyleSheet, StatusBar } from "react-native";
import { useEffect, useState } from "react";
import { products } from "../../constants/products";
import { useLocalSearchParams } from "expo-router";
import { Counter } from "../../components/common/Counter";

export default function id() {
  const { id } = useLocalSearchParams();
  const [item, setItem] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [totalAPagar, setTotalAPagar] = useState(0);

  useEffect(() => {
    const productSelected = products.find((product) => product.id === id);
    setItem(productSelected || null);
  }, [id]);

  useEffect(() => {
    if (item) {
      setTotalAPagar(cantidad * item.price);
    }
  }, [cantidad, item]);

  if (!item) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando producto...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.card}>
        <Image style={styles.imageProduct} source={{ uri: item.imageUrl }} />

        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>${item.price}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>

      <View style={styles.seccionPago}>
        <Counter cantidad={cantidad} setCantidad={setCantidad} item={item} />
        <Text style={styles.total}>${totalAPagar}</Text>
      </View>
    </View>
  );
}

// 🎨 ESTILOS MEJORADOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    fontSize: 18,
    color: "#777",
  },
  card: {
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  imageProduct: {
    width: "100%",
    height: 280,
  },
  info: {
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "#E63946",
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
  },
  seccionPago: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 14,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: -1 },
    shadowRadius: 4,
    elevation: 4,
  },
  total: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
});
