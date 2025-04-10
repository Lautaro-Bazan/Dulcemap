import { View, Text, StyleSheet } from "react-native";

export default function usuario() {
  return (
    <View style={styles.container}>
      <Text>usuario</Text>
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
