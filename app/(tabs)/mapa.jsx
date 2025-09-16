import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { useEffect } from "react";
export default function mapa() {
  useEffect(() => {
      axios.get("http://localhost:8000/api/productos") // si usas emulador Android
      .then(res => {
        // setProductos(res.data);
        console.log(res.data);
        datos = res.data;
      })
      .catch(err => {
        console.error("Error cargando productos:", err);
      });
      // .finally(() => setLoading(false));
  }, []);
  return (
    <View style={styles.container}>
      <Text>mapa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
