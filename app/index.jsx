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
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons"; // Para el icono del ojo

// ⚠️ ¡IMPORTANTE! Revisa que esta sea tu IP y puerto correctos
const API_URL = "http://192.168.7.93:3001";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para el "ojito"
  const router = useRouter();

  const handleLogin = async () => {
    // Validación simple
    if (!username || !password) {
      Alert.alert("Error", "Por favor, ingresa usuario y contraseña.");
      return;
    }

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
        // ¡Login exitoso!
        // Verificamos el rol que nos mandó el backend
        if (data.role === "superadmin") {
          // Redirigir al admin a su pantalla
          router.replace("/admin");
        } else if (data.role === "carpa_admin") {
          // --- ¡ESTE ES EL CAMBIO! ---
          // Redirigir al admin de carpa a la NUEVA ruta de pestañas
          // Lo enviamos a 'pedidos' que es la primera pestaña del grupo (carpa)
          router.replace({
            pathname: "/(carpa)/pedidos", // Nueva ruta
            params: { carpa: data.carpa }, // Le pasamos el nombre de la carpa
          });
        } else {
          // Redirigir al usuario normal a las tabs
          router.replace("/(tabs)");
        }
      } else {
        // Error de login
        Alert.alert("Error", data.message || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo conectar al servidor");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            {/* Logo Circular */}
            <View style={styles.logoContainer}>
              <Image
                source={{
                  uri: "https://placehold.co/150x150/9460b9/FFF?text=Logo",
                }}
                style={styles.logo}
              />
            </View>

            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

            {/* Input de Usuario */}
            <View style={styles.inputContainer}>
              <Feather name="user" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Usuario"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                placeholderTextColor="#888"
              />
            </View>

            {/* Input de Contraseña */}
            <View style={styles.inputContainer}>
              <Feather name="lock" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword} // Controlado por el estado
                placeholderTextColor="#888"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
            </View>

            {/* Botón de Login */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            {/* Botón de Registrarse */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿No tienes una cuenta? </Text>
              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text style={styles.registerLink}>Regístrate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f8", // Un fondo gris claro
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 130,
    height: 130,
    borderRadius: 65, // Circular
    borderWidth: 3,
    borderColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ddd",
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
    backgroundColor: "#9460b9ff", // Color principal
    padding: 18,
    borderRadius: 12,
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
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  registerText: {
    fontSize: 15,
    color: "#777",
  },
  registerLink: {
    fontSize: 15,
    color: "#9460b9ff",
    fontWeight: "bold",
  },
});
