import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { products } from "../../constants/products";
import { ProductCard } from "../../components/common/ProductCard";

export default function name() {
  const { name } = useLocalSearchParams(); // Obtiene el nombre dinámico de la carpa

  // Filtra los productos según el nombre de la carpa
  const filteredProducts = products.filter((product) => product.carpa === name);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Productos en {name}</Text>

      {/* Contenedor de productos con flex-wrap */}
      <View style={styles.containerProducts}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.imageUrl}
            style={styles.productCard}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  containerProducts: {
    flexDirection: "row", // Muestra los productos en fila
    flexWrap: "wrap", // Permite que los productos pasen a la siguiente fila si no caben
    justifyContent: "center", // Centra los elementos horizontalmente
  },
  productCard: {
    marginHorizontal: 10, // Separación horizontal entre tarjetas
    marginVertical: 10, // Separación vertical entre filas
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
    textAlign: "center",
  },
});
