import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

export default function Eventos() {
  // Datos de ejemplo de eventos con imagen local
  const eventos = [
    {
      id: 1,
      nombre: "Concurso de Alfajores",
      fecha: "20/10/2025",
      descripcion:
        "Participa y muestra tus habilidades culinarias en nuestro concurso de alfajores. ¡Habrá premios para los mejores!",
      imagen: require("../../assets/images/evento1.jpg"),
    },
    {
      id: 2,
      nombre: "Música en Vivo",
      fecha: "21/10/2025",
      descripcion:
        "Disfrutá de bandas locales tocando tus canciones favoritas mientras saboreas alfajores y bebidas.",
      imagen: require("../../assets/images/evento2.jpg"),
    },
    {
      id: 3,
      nombre: "Taller de Decoración",
      fecha: "22/10/2025",
      descripcion:
        "Aprendé técnicas de decoración de alfajores con expertos. Ideal para grandes y chicos.",
      imagen: require("../../assets/images/evento3.png"),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Eventos de la Fiesta del Alfajor</Text>

      {eventos.map((evento) => (
        <View key={evento.id} style={styles.card}>
          <Image source={evento.imagen} style={styles.eventImage} />
          <Text style={styles.eventName}>{evento.nombre}</Text>
          <Text style={styles.eventDate}>{evento.fecha}</Text>
          <Text style={styles.eventDesc}>{evento.descripcion}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  eventImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#9460b9",
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  eventDesc: {
    fontSize: 15,
    color: "#555",
    lineHeight: 20,
  },
});
