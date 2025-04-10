import { View, Text, StyleSheet } from "react-native";

export default function mapa() {
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
