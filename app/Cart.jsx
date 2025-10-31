import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet, // Asumo que los estilos están definidos abajo
  Modal,
} from "react-native";
import { CartContext } from "../components/context/CartContext";

// --- ¡NUEVO! Definimos la URL de tu API (DEBE SER LA MISMA QUE EN TU HOME) ---
const API_URL = "http://192.168.7.93:3001"; // <-- CORREGIDO (¡Verifica esta IP!)

export default function Cart() {
  const { cart, removeCart, removeById, getTotalAmount } =
    useContext(CartContext);

  const [showModal, setShowModal] = useState(false);
  const [pickupCode, setPickupCode] = useState(null);

  const total = getTotalAmount();

  const handleCheckout = async () => {
    const code = Math.floor(100000 + Math.random() * 900000);
    setPickupCode(code);

    try {
      // 1. Usar la constante API_URL
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // 2. CORREGIDO: El backend espera 'items', no 'cart'
          items: cart,   
          total: total,
          // 3. El backend (orders.routes.js) genera su propio código, 
          //    así que no necesitamos enviarlo.
          // pickupCode: code, 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Orden guardada:", data);
        // 4. Usar el código de retiro que SÍ nos devuelve el backend
        setPickupCode(data.pickupCode); 
      } else {
        console.error("❌ Error al guardar orden:", data.message);
      }
    } catch (error) {
      console.error("⚠️ Error de conexión con el servidor:", error);
    }

    // Muestra el modal
    setShowModal(true);

    // Vacía el carrito después de finalizar
    removeCart();
  };

  return (
    <ScrollView style={styles.container}>
      {/* ... (Tu JSX de la lista de productos) ... */}

      {cart.length === 0 ? (
         <Text style={styles.emptyText}>Tu carrito está vacío</Text>
       ) : (
         cart.map((product) => (
           <View key={product.id} style={styles.card}>
             <Image
               source={{ uri: product.imageUrl }}
               style={styles.image}
               resizeMode="cover"
             />
             <View style={styles.info}>
               <Text style={styles.name}>{product.title}</Text>
               <Text style={styles.price}>${product.price}</Text>
               <Text style={styles.quantity}>Cantidad: {product.quantity}</Text>

               <TouchableOpacity
                 style={styles.deleteButton}
                 onPress={() => removeById(product.id)}
               >
                 <Text style={styles.deleteText}>Eliminar</Text>
               </TouchableOpacity>
             </View>
           </View>
         ))
       )}

      {cart.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.total}>Total: ${total}</Text>
          
          <TouchableOpacity style={styles.clearButton} onPress={removeCart}>
            <Text style={styles.clearText}>Vaciar carrito</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleCheckout}
          >
            <Text style={styles.checkoutText}>Finalizar compra</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ... (Tu JSX del Modal) ... */}
       <Modal transparent visible={showModal} animationType="fade">
         <View style={styles.overlay}>
           <View style={styles.modal}>
             <Text style={styles.modalTitle}>¡Compra finalizada!</Text>
             <Text style={styles.modalText}>
               Gracias por tu compra 🛍️{"\n"}
               {pickupCode && (
                 <>
                   Tu código de retiro es:{" "}
                   <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                     {pickupCode}
                   </Text>
                 </>
               )}
             </Text>

             <TouchableOpacity
               style={styles.modalButton}
               onPress={() => setShowModal(false)}
             >
               <Text style={styles.modalButtonText}>Aceptar</Text>
             </TouchableOpacity>
           </View>
         </View>
       </Modal>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    color: "#666",
    marginTop: 50,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 16,
    color: "#666",
    marginVertical: 4,
  },
  quantity: {
    fontSize: 14,
    color: "#777",
  },
  deleteButton: {
    marginTop: 8,
    backgroundColor: "#ff4d4d",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 25,
    paddingTop: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  total: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  clearButton: {
    backgroundColor: "#ff8c00",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  clearText: {
    color: "#fff",
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    width: 300,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

