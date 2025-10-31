import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

export default function SuperAdminScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Panel de Super Admin</Text>
      </View>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.card}>
          <Feather name="bar-chart-2" size={40} color="#007bff" />
          <Text style={styles.cardText}>Ver Estadísticas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Feather name="user-plus" size={40} color="#28a745" />
          <Text style={styles.cardText}>Crear Admin de Carpa</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => router.replace("/")} // Vuelve al Login
      >
        <Feather name="log-out" size={18} color="#c94b4b" />
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Estilos similares al dashboard de carpa para consistencia
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  grid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 12,
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    margin: 12,
    width: "40%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  cardText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    margin: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#c94b4b",
  },
  logoutButtonText: {
    color: "#c94b4b",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});