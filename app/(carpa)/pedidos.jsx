import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router"; // ¡Importante!
import { Feather } from '@expo/vector-icons'; // Para iconos

// Asegúrate de que esta IP sea la de tu backend (¡revisa que sea la IP actual!)
const API_URL = "http://192.168.7.93:3001"; 

export default function PedidosScreen() {
  // 1. Obtener el nombre de la carpa de los parámetros de navegación
  const { carpa } = useLocalSearchParams();

  // 2. Estados para manejar los datos, la carga y los errores
  const [pendingItems, setPendingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false); // Para "pull-to-refresh"

  // 3. Función para cargar los datos
  const fetchPendingItems = async () => {
    if (!carpa) return; 

    try {
      setError(null);
      const response = await fetch(`${API_URL}/api/orders/carpa/${carpa}`);
      if (!response.ok) {
        throw new Error("Error al obtener los pedidos de la carpa");
      }
      const data = await response.json();
      setPendingItems(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  // 4. Cargar datos al iniciar la pantalla
  useEffect(() => {
    setIsLoading(true);
    fetchPendingItems();
  }, [carpa]); // Se ejecuta cuando 'carpa' tenga valor

  // 5. Función para el "pull-to-refresh"
  const onRefresh = () => {
    setRefreshing(true);
    fetchPendingItems();
  };

  // --- Renderizado del componente ---

  // Estado de Carga
  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#9460b9ff" />
        <Text style={styles.loadingText}>Cargando pedidos...</Text>
      </View>
    );
  }

  // Estado de Error
  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // --- Renderizado de la Tarea (cada ítem en la lista) ---
  const renderItemTask = ({ item }) => (
    <View style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <Text style={styles.pickupCode}>Código: {item.pickupCode}</Text>
        <Text style={styles.quantity}>
          ({item.item.quantity}x)
        </Text>
      </View>
      <Text style={styles.itemTitle}>{item.item.title}</Text>
      
      <TouchableOpacity 
        style={styles.completeButton}
        onPress={() => alert(`Marcar ${item.item.title} (Orden ${item.orderId}) como entregado.`)}
      >
        <Feather name="check-circle" size={18} color="white" />
        <Text style={styles.completeButtonText}>Marcar Entregado</Text>
      </TouchableOpacity>
    </View>
  );

  // --- Renderizado Principal ---
  return (
    <SafeAreaView style={styles.container}>
      {/* Usamos Stack.Screen para poner un título personalizado a ESTA pestaña */}
      <Stack.Screen options={{ 
        headerShown: true, 
        title: `Pedidos de: ${carpa}`,
        headerStyle: { backgroundColor: '#f4f4f8' },
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: { fontWeight: 'bold' }
      }} />

      {/* Mostramos un mensaje si no hay pedidos */}
      {pendingItems.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.noItemsText}>No tienes pedidos pendientes.</Text>
          <Text style={styles.noItemsSubText}>Arrastra hacia abajo para actualizar.</Text>
        </View>
      ) : (
        <FlatList
          data={pendingItems}
          renderItem={renderItemTask}
          keyExtractor={(item) => `${item.orderId}-${item.item.id}`} // Clave única
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f8",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: 'center',
  },
  noItemsText: {
    fontSize: 18,
    color: "#555",
    fontWeight: "600",
  },
  noItemsSubText: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingTop: 10, // Damos espacio del header
    paddingBottom: 30,
  },
  taskCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  pickupCode: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#9460b9ff", // Color principal
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemTitle: {
    fontSize: 18,
    color: "#444",
    marginBottom: 15,
  },
  completeButton: {
    backgroundColor: "#28a745", // Verde
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
  },
  completeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});