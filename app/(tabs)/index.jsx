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
import { products } from "../../constants/products";
import { carruselImage } from "../../constants/carruselImage";
import { useEffect, useState } from "react";
import Carrusel from "../../components/common/Carrusel";

export default function Index() {
  const [groupedProducts, setGroupedProducts] = useState({});
  const router = useRouter();

  useEffect(() => {
    const grouped = products.reduce((acc, product) => {
      if (!acc[product.carpa]) acc[product.carpa] = [];
      acc[product.carpa].push(product);
      return acc;
    }, {});
    setGroupedProducts(grouped);
  }, []);

  // Filtrar productos en promoción
  const promoProducts = products.filter((p) => p.discount);

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.navbar}>
        <Image
          source={{
            uri: "https://res.cloudinary.com/djigsqrrh/image/upload/v1743529317/d695017f12ee493fed2f14f163f658d9RV4fYsF8O3mT06sR-4_euvflu.jpg",
          }}
          style={styles.logo}
        />
        <CartWidget />
      </View>

      <Carrusel data={carruselImage} />

      {/* --- SECCIÓN PROMOCIONES --- */}
      {promoProducts.length > 0 && (
        <View style={styles.categoryContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.categoryTitle}>Promociones</Text>
            <TouchableOpacity
              style={styles.seeMoreButton}
              onPress={() => router.push("/Promotions")}
            >
              <Text style={styles.seeMoreText}>Ver más →</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollRow}
          >
            {promoProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.imageUrl}
                style={styles.productCard}
              />
            ))}
          </ScrollView>
        </View>
      )}

      {/* --- OTRAS CATEGORÍAS --- */}
      {Object.keys(groupedProducts).map((carpa) => (
        <View key={carpa} style={styles.categoryContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.categoryTitle}>{carpa}</Text>
            <TouchableOpacity
              style={styles.seeMoreButton}
              onPress={() => router.push(`/ItemsCarpa/${carpa}`)}
            >
              <Text style={styles.seeMoreText}>Ver más →</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollRow}
          >
            {groupedProducts[carpa].map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.imageUrl}
                style={styles.productCard}
              />
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // --- General ---
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },

  // --- Categorías ---
  categoryContainer: {
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },

  // --- Botón "Ver más" ---
  seeMoreButton: {
    backgroundColor: "#9460b9ff",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    shadowColor: "#cd7defff",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  seeMoreText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  // --- Scroll horizontal ---
  scrollRow: {
    paddingRight: 10,
  },
  productCard: {
    marginRight: 10,
  },
});
