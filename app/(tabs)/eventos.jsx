import { View, Text, StyleSheet } from "react-native";

export default function eventos() {
  return (
    <View style={styles.container}>
      <Text>eventos</Text>
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
