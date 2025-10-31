import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  Modal,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { Feather } from "@expo/vector-icons";

// ⚠️ ¡IMPORTANTE! Revisa que esta sea tu IP y puerto correctos
const API_URL = "http://192.168.7.93:3001";

export default function ProductosScreen() {
  const { carpa } = useLocalSearchParams(); // Obtiene el nombre de la carpa

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // --- Estados del Modal ---
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // ¿Estamos editando o creando?
  const [currentProduct, setCurrentProduct] = useState(null); // Producto a editar
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
    discount: false, // Asumimos que no por defecto
  });

  // --- 1. FUNCIÓN PARA OBTENER LOS PRODUCTOS ---
  const fetchProducts = async () => {
    if (!carpa) return;
    try {
      setError(null);
      const response = await fetch(`${API_URL}/api/products/carpa/${carpa}`);
      if (!response.ok)
        throw new Error("No se pudieron cargar los productos.");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  // Cargar productos al inicio
  useEffect(() => {
    setIsLoading(true);
    fetchProducts();
  }, [carpa]);

  // Función para "pull-to-refresh"
  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  // --- 2. FUNCIONES DEL MODAL (ABRIR/CERRAR) ---
  const handleOpenModal = (product = null) => {
    if (product) {
      // Estamos EDITANDO un producto existente
      setIsEditing(true);
      setCurrentProduct(product);
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price.toString(), // Convertir a string para el input
        stock: product.stock.toString(), // Convertir a string
        imageUrl: product.imageUrl,
        discount: product.discount,
      });
    } else {
      // Estamos CREANDO un producto nuevo
      setIsEditing(false);
      setCurrentProduct(null);
      setFormData({
        title: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: "",
        discount: false,
      });
    }
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    // Limpiamos los estados al cerrar
    setIsEditing(false);
    setCurrentProduct(null);
    setFormData({
      title: "",
      description: "",
      price: "",
      stock: "",
      imageUrl: "",
      discount: false,
    });
  };

  // --- 3. FUNCIÓN PARA ENVIAR (CREAR/EDITAR) ---
  const handleSubmitProduct = async () => {
    // Validación simple
    if (!formData.title || !formData.price || !formData.stock) {
      Alert.alert("Error", "Título, Precio y Stock son obligatorios.");
      return;
    }

    // Preparamos el cuerpo (body) de la solicitud
    const productData = {
      ...formData,
      price: parseFloat(formData.price), // Convertir a número
      stock: parseInt(formData.stock, 10), // Convertir a entero
      carpa: carpa, // ¡Importante! Asignar la carpa
    };

    try {
      let response;
      if (isEditing) {
        // --- Lógica de ACTUALIZACIÓN (PUT) ---
        response = await fetch(`${API_URL}/api/products/${currentProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
      } else {
        // --- Lógica de CREACIÓN (POST) ---
        response = await fetch(`${API_URL}/api/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
      }

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "No se pudo guardar el producto");
      }

      // Éxito
      fetchProducts(); // Recargamos la lista de productos
      handleCloseModal(); // Cerramos el modal
    } catch (err) {
      console.error(err);
      Alert.alert("Error al guardar", err.message);
    }
  };

  // --- 4. FUNCIÓN PARA ELIMINAR ---
  const handleDeleteProduct = async (id) => {
    // Pedimos confirmación
    Alert.alert(
      "Eliminar Producto",
      "¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(`${API_URL}/api/products/${id}`, {
                method: "DELETE",
              });
              if (!response.ok)
                throw new Error("No se pudo eliminar el producto.");
              
              // Éxito
              fetchProducts(); // Recargamos la lista
            } catch (err) {
              console.error(err);
              Alert.alert("Error", err.message);
            }
          },
        },
      ]
    );
  };

  // --- RENDERIZADO ---

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#9460b9ff" />
        <Text style={styles.loadingText}>Cargando tu inventario...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // --- Renderizado de cada Producto en la Lista ---
  const renderProductItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image
        source={{ uri: item.imageUrl || "https://placehold.co/100x100?text=Sin+Imagen" }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <Text style={styles.productStock}>Stock: {item.stock}</Text>
      </View>
      <View style={styles.productActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleOpenModal(item)} // Abre modal para EDITAR
        >
          <Feather name="edit-2" size={20} color="#3498db" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDeleteProduct(item.id)} // Llama a ELIMINAR
        >
          <Feather name="trash-2" size={20} color="#e74c3c" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header personalizado para esta pestaña */}
      <Stack.Screen
        options={{
          headerShown: true,
          title: `Inventario: ${carpa}`,
          headerStyle: { backgroundColor: "#f4f4f8" },
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
          // Botón para AÑADIR NUEVO producto
          headerRight: () => (
            <TouchableOpacity
              onPress={() => handleOpenModal(null)} // Abre modal para CREAR
              style={{ marginRight: 15 }}
            >
              <Feather name="plus-circle" size={26} color="#9460b9ff" />
            </TouchableOpacity>
          ),
        }}
      />

      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.noItemsText}>No tienes productos.</Text>
            <Text style={styles.noItemsSubText}>Toca el "+" para añadir uno.</Text>
          </View>
        }
      />

      {/* --- MODAL PARA CREAR/EDITAR PRODUCTO --- */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>
                {isEditing ? "Editar Producto" : "Nuevo Producto"}
              </Text>

              {/* Formulario */}
              <Text style={styles.inputLabel}>Título</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: Alfajor de Chocolate"
                value={formData.title}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, title: text }))
                }
              />

              <Text style={styles.inputLabel}>Descripción</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Relleno de dulce de leche..."
                value={formData.description}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, description: text }))
                }
                multiline
              />

              <Text style={styles.inputLabel}>Precio</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: 1200"
                value={formData.price}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, price: text }))
                }
                keyboardType="numeric"
              />

              <Text style={styles.inputLabel}>Stock</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: 50"
                value={formData.stock}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, stock: text }))
                }
                keyboardType="numeric"
              />

              <Text style={styles.inputLabel}>URL de la Imagen</Text>
              <TextInput
                style={styles.input}
                placeholder="https://..."
                value={formData.imageUrl}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, imageUrl: text }))
                }
              />

              {/* Botones del Modal */}
              <View style={styles.modalButtonRow}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleSubmitProduct}
                >
                  <Text style={styles.modalButtonText}>Guardar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    marginTop: -50, // Ajuste para centrar mejor
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
    paddingTop: 10,
    paddingBottom: 30,
  },
  // Card de Producto
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },
  productInfo: {
    flex: 1, // Ocupa el espacio disponible
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 15,
    color: "#9460b9ff",
    fontWeight: "600",
    marginTop: 2,
  },
  productStock: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },
  productActions: {
    flexDirection: "row",
  },
  actionButton: {
    padding: 8,
    marginLeft: 5,
  },
  // Estilos del Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end", // Aparece desde abajo
  },
  modalContainer: {
    backgroundColor: "white",
    height: "85%", // Ocupa el 85% de la pantalla
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputLabel: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#f4f4f8",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  modalButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#777",
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: "#9460b9ff", // Color principal
    marginLeft: 10,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});