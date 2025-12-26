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
import { LinearGradient } from "expo-linear-gradient";

const COLORS = {
  primary: '#6C63FF',
  primaryDark: '#5A52D5',
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

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა")
    .lowercase()
    .trim()
    .required("ელ-ფოსტა სავალდებულოა"),
  password: Yup.string()
    .min(6, "პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო")
    .required("პაროლი სავალდებულოა"),
});

export default function LoginScreen() {
  const router = useRouter();
  const { loginWithToken } = useAuth();

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const success = await loginWithToken(values.email, values.password);
      if (success) {
        router.replace("/(tabs)/phones");
      } else {
        Alert.alert("შეცდომა", "არასწორი ელ-ფოსტა ან პაროლი", [{ text: "კარგი" }]);
      }
    } catch (error) {
      Alert.alert("შეცდომა", "ავტორიზაციის დროს მოხდა შეცდომა", [{ text: "კარგი" }]);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.headerGradient}>
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <Ionicons name="shield-checkmark" size={50} color={COLORS.textWhite} />
          </View>
          <Text style={styles.title}>მოგესალმებით!</Text>
          <Text style={styles.subtitle}>შედით თქვენს ანგარიშში</Text>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.formWrapper}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.formCard}>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={handleLogin}
              validateOnChange={false}
              validateOnBlur={true}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>ელ-ფოსტა</Text>
                    <View style={[styles.inputWrapper, touched.email && errors.email && styles.inputError]}>
                      <Ionicons name="mail-outline" size={20} color={COLORS.textSecondary} style={styles.icon} />
                      <TextInput
                        style={styles.input}
                        placeholder="example@email.com"
                        placeholderTextColor={COLORS.textLight}
                        value={values.email}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </View>
                    {errors.email && touched.email && (
                      <View style={styles.errorContainer}>
                        <Ionicons name="alert-circle" size={14} color={COLORS.error} />
                        <Text style={styles.errorText}>{errors.email}</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>პაროლი</Text>
                    <View style={[styles.inputWrapper, touched.password && errors.password && styles.inputError]}>
                      <Ionicons name="lock-closed-outline" size={20} color={COLORS.textSecondary} style={styles.icon} />
                      <TextInput
                        style={styles.input}
                        placeholder="••••••••"
                        placeholderTextColor={COLORS.textLight}
                        value={values.password}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        secureTextEntry
                      />
                    </View>
                    {errors.password && touched.password && (
                      <View style={styles.errorContainer}>
                        <Ionicons name="alert-circle" size={14} color={COLORS.error} />
                        <Text style={styles.errorText}>{errors.password}</Text>
                      </View>
                    )}
                  </View>

                  <TouchableOpacity style={styles.loginButton} onPress={() => handleSubmit()} activeOpacity={0.8}>
                    <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradientButton}>
                      <Ionicons name="log-in-outline" size={22} color={COLORS.textWhite} />
                      <Text style={styles.loginButtonText}>შესვლა</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>ან</Text>
                    <View style={styles.dividerLine} />
                  </View>

                  <TouchableOpacity style={styles.registerButton} onPress={() => router.push("/register")} activeOpacity={0.8}>
                    <Ionicons name="person-add-outline" size={20} color={COLORS.primary} />
                    <Text style={styles.registerButtonText}>ახალი ანგარიშის შექმნა</Text>
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
  headerGradient: { paddingTop: Platform.OS === 'ios' ? 60 : 50, paddingBottom: 60, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  headerContent: { alignItems: "center" },
  iconContainer: { width: 90, height: 90, borderRadius: 45, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 32, color: COLORS.textWhite, fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  formWrapper: { flex: 1, marginTop: -30 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 40 },
  formCard: { backgroundColor: COLORS.surface, borderRadius: 24, padding: 24, shadowColor: '#1A1A2E', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.16, shadowRadius: 16, elevation: 8 },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 14, color: COLORS.textSecondary, marginBottom: 8, fontWeight: '600' },
  inputWrapper: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.surfaceLight, borderRadius: 12, borderWidth: 2, borderColor: COLORS.border, paddingHorizontal: 16 },
  inputError: { borderColor: COLORS.error },
  icon: { marginRight: 8 },
  input: { flex: 1, paddingVertical: 16, fontSize: 16, color: COLORS.text },
  errorContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 4 },
  errorText: { color: COLORS.error, fontSize: 12 },
  loginButton: { marginTop: 8, borderRadius: 12, overflow: 'hidden' },
  gradientButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 16, gap: 8 },
  loginButtonText: { color: COLORS.textWhite, fontSize: 18, fontWeight: 'bold' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  dividerText: { marginHorizontal: 16, color: COLORS.textLight, fontSize: 14 },
  registerButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, borderRadius: 12, borderWidth: 2, borderColor: COLORS.primary, gap: 8 },
  registerButtonText: { color: COLORS.primary, fontSize: 16, fontWeight: '600' },
});
