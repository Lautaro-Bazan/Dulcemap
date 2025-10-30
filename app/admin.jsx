// app/admin.jsx
import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function AdminScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido, Admin!</Text>
      <Text>Este es el panel de administración.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});