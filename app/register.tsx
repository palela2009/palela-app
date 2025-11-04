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


const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "სახელი უნდა იყოს მინიმუმ 2 სიმბოლო")
    .required("სახელი სავალდებულოა"),
  lastName: Yup.string()
    .min(2, "გვარი უნდა იყოს მინიმუმ 2 სიმბოლო")
    .required("გვარი სავალდებულოა"),
  email: Yup.string()
    .email("გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა")
    .required("ელ-ფოსტა სავალდებულოა"),
  phone: Yup.string()
    .matches(/^[0-9+\s-]+$/, "გთხოვთ შეიყვანოთ სწორი ტელეფონის ნომერი")
    .min(9, "ტელეფონის ნომერი ძალიან მოკლეა")
    .required("ტელეფონის ნომერი სავალდებულოა"),
  password: Yup.string()
    .min(6, "პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო")
    .required("პაროლი სავალდებულოა"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "პაროლები არ ემთხვევა")
    .required("პაროლის დადასტურება სავალდებულოა"),
});

export default function RegisterScreen() {
  const router = useRouter();
  const { authState, authDispatch } = useAuth();

  const handleRegister = (values: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) => {
    const existingUser = authState.users.find((u) => u.email === values.email);

    if (existingUser) {
      Alert.alert("შეცდომა", "ამ ელ-ფოსტით იუზერი უკვე რეგისტრირებულია");
      return;
    }

    authDispatch({
      type: "REGISTER",
      user: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        password: values.password,
      },
    });

    Alert.alert(
      "წარმატება",
      "თქვენ წარმატებით დარეგისტრირდით! გთხოვთ შეხვიდეთ სისტემაში.",
      [
        {
          text: "კარგი",
          onPress: () => router.replace("/login"),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Ionicons name="person-add" size={80} color="#28a745" />
          <Text style={styles.title}>რეგისტრაცია</Text>
          <Text style={styles.subtitle}>შექმენით ახალი ანგარიში</Text>
        </View>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
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
                <Text style={styles.label}>სახელი</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color="#666"
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="შეიყვანეთ სახელი"
                    placeholderTextColor="#999"
                    value={values.firstName}
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    autoComplete="name"
                  />
                </View>
                {errors.firstName && touched.firstName && (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>გვარი</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color="#666"
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="შეიყვანეთ გვარი"
                    placeholderTextColor="#999"
                    value={values.lastName}
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    autoComplete="name-family"
                  />
                </View>
                {errors.lastName && touched.lastName && (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>ელ-ფოსტა</Text>
                <View style={styles.inputWrapper}>
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
                <Text style={styles.label}>ტელეფონის ნომერი</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="call-outline"
                    size={20}
                    color="#666"
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="+995 555 12 34 56"
                    placeholderTextColor="#999"
                    value={values.phone}
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    keyboardType="phone-pad"
                    autoComplete="tel"
                  />
                </View>
                {errors.phone && touched.phone && (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>პაროლი</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#666"
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="მინიმუმ 6 სიმბოლო"
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

              <View style={styles.inputContainer}>
                <Text style={styles.label}>პაროლის დადასტურება</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#666"
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="გაიმეორეთ პაროლი"
                    placeholderTextColor="#999"
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    secureTextEntry
                  />
                </View>
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => handleSubmit()}
              >
                <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
                <Text style={styles.registerButtonText}>რეგისტრაცია</Text>
              </TouchableOpacity>

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>უკვე გაქვთ ანგარიში?</Text>
                <TouchableOpacity onPress={() => router.replace("/login")}>
                  <Text style={styles.loginLink}>შესვლა</Text>
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
    paddingVertical: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
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
    marginBottom: 18,
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
  registerButton: {
    flexDirection: "row",
    backgroundColor: "#28a745",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
  },
  loginText: {
    color: "#666",
    fontSize: 14,
  },
  loginLink: {
    color: "#007bff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
