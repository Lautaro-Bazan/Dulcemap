import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

export default function Usuario() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Te damos la bienvenida a Dulcemap</Text>
      <Text style={styles.text}>
        Ingresá para disfrutar de nuestros productos, beneficios y más
      </Text>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => router.push("/(home)/Cart")}
      >
        <Text style={styles.botonTexto}>Ingresar</Text>
      </TouchableOpacity>
      <View style={styles.item}>
        <Text style={styles.itemText}>Perfil</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemText}>Mis Pedidos</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemText}>Mis Cupones</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    marginBottom: 20,
  },
  boton: {
    backgroundColor: "#ffcc00",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30, // Se ha aumentado el margen inferior
  },
  botonTexto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  item: {
    padding: 15,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
  },
});
