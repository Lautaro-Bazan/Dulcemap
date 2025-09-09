import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { products } from "../products";

import { CartWidget } from "../../components/common/CartWidget";

import { ProductCard } from "../../components/common/ProductCard"; // ajusta el path según tu proyecto

export default function Descuentos() {
  const [discountProducts, setDiscountProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Filtrar productos con descuento
    const filtered = products.filter((p) => p.discount === true);
    setDiscountProducts(filtered);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        {/* Navbar */}
        <View style={styles.navbar}>
          <Image
            source={{
              uri: "https://res.cloudinary.com/djigsqrrh/image/upload/v1743529317/d695017f12ee493fed2f14f163f658d9RV4fYsF8O3mT06sR-4_euvflu.jpg",
            }}
            style={styles.img}
          />
          <CartWidget />
        </View>

        {/* Título */}
        <Text style={styles.title}>Productos en Descuento</Text>

        {/* Lista horizontal */}
        <View>
          {discountProducts.length > 0 ? (
            discountProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.imageUrl}
                style={styles.card}
              />
            ))
          ) : (
            <Text style={styles.noProducts}>No hay productos en descuento</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },

  card: {
    width: "%100",
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
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  img: {
    width: 40,
    height: 40,  
    marginLeft: 15,
    marginTop: 10
  },
});
