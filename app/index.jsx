import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons"; // Importamos los iconos

// Asegúrate de que esta IP es la de tu backend
const API_URL = "http://192.168.0.139:3001";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para el "ojito"
  const [isLoading, setIsLoading] = useState(false); // Estado para el spinner
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Campos vacíos", "Por favor, ingresa tu usuario y contraseña.");
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.role === "admin") {
          router.replace("/admin");
        } else {
          router.replace("/(tabs)");
        }
      } else {
        Alert.alert("Error", data.message || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo conectar al servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        {/* Logo Placeholder */}
        <Image
          // Reemplaza esta URL por la de tu logo
          source={{ uri: "https://res.cloudinary.com/djigsqrrh/image/upload/v1743529317/d695017f12ee493fed2f14f163f658d9RV4fYsF8O3mT06sR-4_euvflu.jpg" }}
          style={styles.logo}
        />

        <Text style={styles.title}>Iniciar Sesión</Text>
        <Text style={styles.subtitle}>Bienvenido de nuevo</Text>

        {/* Input de Usuario */}
        <View style={styles.inputContainer}>
          <Feather name="user" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        {/* Input de Contraseña */}
        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword} // Controlado por el estado
          />
          {/* Botón de "ojito" */}
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Feather
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        {/* Botón de Login */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        {/* Botón de Registrarse */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.registerButtonText}>
            ¿No tienes cuenta? <Text style={styles.registerLink}>Regístrate</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    width: 120,
    height: 120,
     // Circular
    alignSelf: "center",
    marginBottom: 30,
    backgroundColor: '#f0f0f0'
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 55,
    fontSize: 16,
    color: "#333",
  },
  eyeIcon: {
    padding: 5,
  },
  button: {
    backgroundColor: "#9460b9ff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#9460b9ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerButton: {
    marginTop: 30,
    alignItems: "center",
  },
  registerButtonText: {
    fontSize: 15,
    color: "#666",
  },
  registerLink: {
    color: "#9460b9ff",
    fontWeight: "bold",
  },
});
