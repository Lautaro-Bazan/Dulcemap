import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { CartWidget } from "../../components/common/CartWidget";
import { ProductCard } from "../../components/common/ProductCard";
import { products } from "../products";
import { carruselImage } from "../carruselImage"; // Importa el archivo con las imágenes
import { useEffect, useState } from "react";
import Carrusel from "../../components/common/Carrusel"; // Importa el componente Carrusel

export default function Index() {
  const [groupedProducts, setGroupedProducts] = useState({});
  const router = useRouter();

  useEffect(() => {
    // Agrupa los productos por "carpa"
    const grouped = products.reduce((acc, product) => {
      if (!acc[product.carpa]) {
        acc[product.carpa] = [];
      }
      acc[product.carpa].push(product);
      return acc;
    }, {});

    setGroupedProducts(grouped);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.navbar}>
          <Image
            source={{
              uri: "https://res.cloudinary.com/djigsqrrh/image/upload/v1743529317/d695017f12ee493fed2f14f163f658d9RV4fYsF8O3mT06sR-4_euvflu.jpg",
            }}
            style={styles.img}
          />
          <CartWidget />
        </View>

        <Carrusel data={carruselImage} />

        {Object.keys(groupedProducts).map((carpa) => (
          <View key={carpa} style={styles.categoryContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.categoryTitle}>{carpa}</Text>
              <TouchableOpacity
                onPress={() => router.push(`/ItemsCarpa/${carpa}`)}
              >
                <Text style={styles.link}>Ver más</Text>
              </TouchableOpacity>
            </View>

            {/* Scroll horizontal para productos */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {groupedProducts[carpa].map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.imageUrl}
                  style={styles.productCard} // Estilo opcional para ajustar las tarjetas
                />
              ))}
            </ScrollView>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0, // Mantén el padding general para los otros elementos
    backgroundColor: "#fff",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  categoryContainer: {
    marginBottom: 20, // Espaciado entre secciones
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  link: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
  },
  productCard: {
    marginHorizontal: 5, 
  },
  img: {
    width: 40,
    height: 40,  
    marginLeft: 15,
    marginTop: 10
  },
});
