import React, { useState, useEffect } from "react";
import { View, FlatList, Image, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function Carrusel({ data }) {
  const scrollRef = React.useRef(null); // Referencia al FlatList
  const [currentIndex, setCurrentIndex] = useState(0); // Índice actual

  // Duplica el array original para simular continuidad infinita
  const extendedData = [...data, ...data];

  useEffect(() => {
    // Configura un intervalo para mover el scroll automáticamente
    const interval = setInterval(() => {
      // Calcula el siguiente índice
      let nextIndex = currentIndex + 1;

      // Si llega al final del array extendido, recíclalo
      if (nextIndex >= extendedData.length) {
        nextIndex = data.length; // Salta al comienzo del duplicado
        scrollRef.current?.scrollToOffset({
          offset: nextIndex * width,
          animated: false,
        });
      } else {
        // Avanza al siguiente índice
        scrollRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      }

      setCurrentIndex(nextIndex); // Actualiza el índice actual
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, [currentIndex, extendedData.length]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={scrollRef}
        data={extendedData}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
        )}
        onMomentumScrollEnd={(event) => {
          // Detecta el índice actual al final del desplazamiento manual
          const index = Math.round(event.nativeEvent.contentOffset.x / width);

          // Si está más allá del primer duplicado, recíclalo
          if (index >= data.length) {
            scrollRef.current?.scrollToOffset({
              offset: (index % data.length) * width,
              animated: false,
            });
            setCurrentIndex(index % data.length);
          } else {
            setCurrentIndex(index);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  card: {
    width, // Ancho completo del carrusel
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
});
