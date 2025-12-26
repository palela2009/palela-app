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
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import { useProfile } from "../contexts/ProfileContext";
import { authService } from "../services/api";
import { tokenStorage } from "../utils/tokenStorage";
import { LinearGradient } from "expo-linear-gradient";

const COLORS = {
  primary: '#6C63FF',
  primaryDark: '#5A52D5',
  secondary: '#2ECC71',
  secondaryDark: '#27AE60',
  background: '#F8F9FE',
  surface: '#FFFFFF',
  surfaceLight: '#F5F6FA',
  text: '#1A1A2E',
  textSecondary: '#666687',
  textLight: '#9999AA',
  textWhite: '#FFFFFF',
  border: '#E8E8F0',
  error: '#E74C3C',
};

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "მინიმუმ 2 სიმბოლო").required("სახელი სავალდებულოა"),
  lastName: Yup.string().min(2, "მინიმუმ 2 სიმბოლო").required("გვარი სავალდებულოა"),
  email: Yup.string().email("გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა").required("ელ-ფოსტა სავალდებულოა"),
  phone: Yup.string().min(9, "მინიმუმ 9 სიმბოლო").required("ტელეფონი სავალდებულოა"),
  password: Yup.string().min(6, "მინიმუმ 6 სიმბოლო").required("პაროლი სავალდებულოა"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], "პაროლები არ ემთხვევა").required("დაადასტურეთ პაროლი"),
});

export default function RegisterScreen() {
  const router = useRouter();
  const { authDispatch } = useAuth();
  const { dispatch: profileDispatch } = useProfile();

  const handleRegister = async (values: any) => {
    try {
      const name = `${values.firstName.trim()} ${values.lastName.trim()}`;
      const email = values.email.toLowerCase().trim();
      const response = await authService.register(name, email, values.password, values.phone.trim());

      if (response.success && response.token) {
        await tokenStorage.saveToken(response.token);
        authDispatch({ type: "SET_AUTH", user: response.user });
        profileDispatch({
          type: "LOAD_USER",
          user: { firstName: values.firstName.trim(), lastName: values.lastName.trim(), email, phone: values.phone.trim() },
        });
        router.replace("/(tabs)/phones");
      } else {
        Alert.alert("შეცდომა", response.message || "რეგისტრაცია ვერ მოხერხდა");
      }
    } catch (error: any) {
      Alert.alert("შეცდომა", error?.response?.data?.message || "რეგისტრაციის დროს მოხდა შეცდომა");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={[COLORS.secondary, COLORS.secondaryDark]} style={styles.headerGradient}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textWhite} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <Ionicons name="person-add" size={50} color={COLORS.textWhite} />
          </View>
          <Text style={styles.title}>რეგისტრაცია</Text>
          <Text style={styles.subtitle}>შექმენით ახალი ანგარიში</Text>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.formWrapper}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.formCard}>
            <Formik
              initialValues={{ firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "" }}
              validationSchema={RegisterSchema}
              onSubmit={handleRegister}
              validateOnChange={false}
              validateOnBlur={true}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <>
                  <View style={styles.row}>
                    <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                      <Text style={styles.label}>სახელი</Text>
                      <View style={[styles.inputWrapper, touched.firstName && errors.firstName && styles.inputError]}>
                        <Ionicons name="person-outline" size={18} color={COLORS.textSecondary} />
                        <TextInput style={styles.input} placeholder="სახელი" placeholderTextColor={COLORS.textLight} value={values.firstName} onChangeText={handleChange("firstName")} onBlur={handleBlur("firstName")} />
                      </View>
                      {errors.firstName && touched.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
                    </View>
                    <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                      <Text style={styles.label}>გვარი</Text>
                      <View style={[styles.inputWrapper, touched.lastName && errors.lastName && styles.inputError]}>
                        <Ionicons name="person-outline" size={18} color={COLORS.textSecondary} />
                        <TextInput style={styles.input} placeholder="გვარი" placeholderTextColor={COLORS.textLight} value={values.lastName} onChangeText={handleChange("lastName")} onBlur={handleBlur("lastName")} />
                      </View>
                      {errors.lastName && touched.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
                    </View>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>ელ-ფოსტა</Text>
                    <View style={[styles.inputWrapper, touched.email && errors.email && styles.inputError]}>
                      <Ionicons name="mail-outline" size={18} color={COLORS.textSecondary} />
                      <TextInput style={styles.input} placeholder="example@email.com" placeholderTextColor={COLORS.textLight} value={values.email} onChangeText={handleChange("email")} onBlur={handleBlur("email")} keyboardType="email-address" autoCapitalize="none" />
                    </View>
                    {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>ტელეფონი</Text>
                    <View style={[styles.inputWrapper, touched.phone && errors.phone && styles.inputError]}>
                      <Ionicons name="call-outline" size={18} color={COLORS.textSecondary} />
                      <TextInput style={styles.input} placeholder="+995 555 123 456" placeholderTextColor={COLORS.textLight} value={values.phone} onChangeText={handleChange("phone")} onBlur={handleBlur("phone")} keyboardType="phone-pad" />
                    </View>
                    {errors.phone && touched.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>პაროლი</Text>
                    <View style={[styles.inputWrapper, touched.password && errors.password && styles.inputError]}>
                      <Ionicons name="lock-closed-outline" size={18} color={COLORS.textSecondary} />
                      <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor={COLORS.textLight} value={values.password} onChangeText={handleChange("password")} onBlur={handleBlur("password")} secureTextEntry />
                    </View>
                    {errors.password && touched.password && <Text style={styles.errorText}>{errors.password}</Text>}
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>პაროლის დადასტურება</Text>
                    <View style={[styles.inputWrapper, touched.confirmPassword && errors.confirmPassword && styles.inputError]}>
                      <Ionicons name="lock-closed-outline" size={18} color={COLORS.textSecondary} />
                      <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor={COLORS.textLight} value={values.confirmPassword} onChangeText={handleChange("confirmPassword")} onBlur={handleBlur("confirmPassword")} secureTextEntry />
                    </View>
                    {errors.confirmPassword && touched.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                  </View>

                  <TouchableOpacity style={styles.registerBtn} onPress={() => handleSubmit()} activeOpacity={0.8}>
                    <LinearGradient colors={[COLORS.secondary, COLORS.secondaryDark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradientButton}>
                      <Ionicons name="checkmark-circle-outline" size={22} color={COLORS.textWhite} />
                      <Text style={styles.registerBtnText}>რეგისტრაცია</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.loginLink} onPress={() => router.push("/login")}>
                    <Text style={styles.loginLinkText}>უკვე გაქვთ ანგარიში? <Text style={styles.loginLinkBold}>შესვლა</Text></Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  headerGradient: { paddingTop: Platform.OS === 'ios' ? 60 : 50, paddingBottom: 50, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  backButton: { position: 'absolute', top: Platform.OS === 'ios' ? 50 : 40, left: 20, zIndex: 10, padding: 8 },
  headerContent: { alignItems: "center" },
  iconContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 28, color: COLORS.textWhite, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  formWrapper: { flex: 1, marginTop: -25 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 20, paddingBottom: 40 },
  formCard: { backgroundColor: COLORS.surface, borderRadius: 20, padding: 20, shadowColor: '#1A1A2E', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 16, elevation: 8 },
  row: { flexDirection: 'row' },
  inputContainer: { marginBottom: 16 },
  label: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 6, fontWeight: '600' },
  inputWrapper: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.surfaceLight, borderRadius: 10, borderWidth: 1.5, borderColor: COLORS.border, paddingHorizontal: 12, gap: 8 },
  inputError: { borderColor: COLORS.error },
  input: { flex: 1, paddingVertical: 14, fontSize: 15, color: COLORS.text },
  errorText: { color: COLORS.error, fontSize: 11, marginTop: 4 },
  registerBtn: { marginTop: 8, borderRadius: 12, overflow: 'hidden' },
  gradientButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 16, gap: 8 },
  registerBtnText: { color: COLORS.textWhite, fontSize: 17, fontWeight: 'bold' },
  loginLink: { alignItems: 'center', marginTop: 20 },
  loginLinkText: { color: COLORS.textSecondary, fontSize: 14 },
  loginLinkBold: { color: COLORS.primary, fontWeight: 'bold' },
});
