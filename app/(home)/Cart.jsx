import { useContext } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native"; // Agregué Image
import { CartContext } from "../../components/context/CartContext";
import { Button } from "react-native-web";

export default function Cart() {
  const { cart, removeCart, removeById, getTotalAmount } =
    useContext(CartContext);
  let total = getTotalAmount();
  return (
    <ScrollView>
      {cart.map((product) => (
        <View key={product.id}>
          <Image
            source={{ uri: product.imageUrl }}
            style={{ width: 100, height: 100 }}
          />
          <Text>{product.title}</Text>
          <Text>{product.price}</Text>
          <Text>{product.quantity}</Text>
          <TouchableOpacity
            onPress={() => {
              removeById(product.id);
            }}
          >
            <Text>eliminar</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity onPress={removeCart}>
        <Text>Vaciar carrito</Text>
      </TouchableOpacity>
      <Text>Total: {total}</Text>
    </ScrollView>
  );
}
