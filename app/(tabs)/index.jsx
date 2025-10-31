import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator, // ¡NUEVO! Para el indicador de carga
} from "react-native";
import { CartWidget } from "../../components/common/CartWidget";
import { ProductCard } from "../../components/common/ProductCard";
// import { products } from "../../constants/products"; // <-- ELIMINADO
import { carruselImage } from "../../constants/carruselImage";
import { useEffect, useState } from "react";
import Carrusel from "../../components/common/Carrusel";

// ¡NUEVO! Definimos la URL de tu API
// Asegúrate de que esta IP sea la de tu backend
const API_URL = "http://192.168.7.93:3001";

export default function Index() {
  // --- ¡NUEVOS ESTADOS! ---
  const [allProducts, setAllProducts] = useState([]); // Almacena TODOS los productos de la API
  const [groupedProducts, setGroupedProducts] = useState({});
  const [promoProducts, setPromoProducts] = useState([]); // Ahora es un estado
  const [isLoading, setIsLoading] = useState(true); // Para el indicador de carga
  const [error, setError] = useState(null); // Para manejar errores
  // --------------------------

  const router = useRouter();

  // --- ¡NUEVO! useEffect para Cargar Datos de la API ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true); // Empezamos a cargar
        const response = await fetch(`${API_URL}/api/products`);
        if (!response.ok) {
          throw new Error("No se pudo conectar al servidor");
        }
        const data = await response.json();
        setAllProducts(data); // Guardamos los productos de la API
        setError(null); // Limpiamos errores previos
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false); // Terminamos de cargar
      }
    };

    fetchProducts();
  }, []); // El array vacío [] asegura que se ejecute solo una vez al montar

  // --- ¡NUEVO! useEffect para Procesar los productos ---
  // Este efecto se ejecuta CADA VEZ que 'allProducts' cambia (después del fetch)
  useEffect(() => {
    if (allProducts.length > 0) {
      // 1. Agrupar productos por 'carpa'
      const grouped = allProducts.reduce((acc, product) => {
        if (!acc[product.carpa]) acc[product.carpa] = [];
        acc[product.carpa].push(product);
        return acc;
      }, {});
      setGroupedProducts(grouped);

      // 2. Filtrar productos en promoción
      const promos = allProducts.filter((p) => p.discount);
      setPromoProducts(promos);
    }
  }, [allProducts]); // Se re-ejecuta si allProducts cambia

  // --- Vistas de Carga y Error ---
  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#9460b9ff" />
        <Text style={styles.loadingText}>Cargando productos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Text style={styles.errorText}>Asegúrate de que el servidor esté corriendo.</Text>
      </View>
    );
  }
  
  // --- Vista Principal (cuando ya cargó todo) ---
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
      {/* Esto ahora funciona con el estado 'promoProducts' */}
      {promoProducts.length > 0 && (
        <View style={styles.categoryContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.categoryTitle}>Promociones</Text>
            <TouchableOpacity
              style={styles.seeMoreButton}
              onPress={() => router.push("/Promotions")} // Asegúrate que esta ruta 'Promotions' exista en /app
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
      {/* Esto ahora funciona con el estado 'groupedProducts' */}
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
  // --- Estilos de Carga y Error ---
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 5,
  },
  // ---------------------------------
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
