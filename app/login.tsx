import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import { useProfile } from "../contexts/ProfileContext";


const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა")
    .lowercase()
    .trim()
    .required("ელ-ფოსტა სავალდებულოა"),
  password: Yup.string()
    .min(6, "პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო")
    .max(50, "პაროლი ძალიან გრძელია")
    .required("პაროლი სავალდებულოა"),
});

export default function LoginScreen() {
  const router = useRouter();
  const { loginWithToken } = useAuth();
  const { dispatch: profileDispatch } = useProfile();

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const success = await loginWithToken(values.email, values.password);

      if (success) {
        Alert.alert("წარმატება", "თქვენ წარმატებით შეხვედით სისტემაში!", [
          {
            text: "კარგი",
            onPress: () => router.replace("/(tabs)/phones"),
          },
        ]);
      } else {
        Alert.alert(
          "შეცდომა",
          "არასწორი ელ-ფოსტა ან პაროლი. გთხოვთ შეამოწმოთ თქვენი მონაცემები და სცადოთ თავიდან.",
          [{ text: "კარგი" }]
        );
      }
    } catch (error) {
      Alert.alert(
        "შეცდომა",
        "ავტორიზაციის დროს მოხდა შეცდომა. გთხოვთ სცადოთ თავიდან.",
        [{ text: "კარგი" }]
      );
      console.error("Login error:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Ionicons name="lock-closed" size={80} color="#007bff" />
          <Text style={styles.title}>ავტორიზაცია</Text>
          <Text style={styles.subtitle}>შედით თქვენს ანგარიშში</Text>
        </View>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
          validateOnChange={false}
          validateOnBlur={true}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>ელ-ფოსტა</Text>
                <View style={[styles.inputWrapper, touched.email && errors.email && styles.inputError]}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="#666"
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="example@email.com"
                    placeholderTextColor="#999"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />
                </View>
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>პაროლი</Text>
                <View style={[styles.inputWrapper, touched.password && errors.password && styles.inputError]}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#666"
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor="#999"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    secureTextEntry
                    autoComplete="password"
                  />
                </View>
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => handleSubmit()}
              >
                <Ionicons name="log-in-outline" size={20} color="#fff" />
                <Text style={styles.loginButtonText}>შესვლა</Text>
              </TouchableOpacity>

              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>არ გაქვთ ანგარიში?</Text>
                <TouchableOpacity onPress={() => router.push("/register")}>
                  <Text style={styles.registerLink}>რეგისტრაცია</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    fontWeight: "600",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 15,
  },
  inputError: {
    borderColor: "#dc3545",
    borderWidth: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    color: "#dc3545",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  loginButton: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
  },
  registerText: {
    color: "#666",
    fontSize: 14,
  },
  registerLink: {
    color: "#007bff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  debugContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 5,
  },
  debugText: {
    fontSize: 12,
    color: "#999",
  },
});
