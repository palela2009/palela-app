import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService } from "../../../services/api";

const COLORS = {
  primary: '#6C63FF',
  primaryDark: '#5A52D5',
  success: '#2ECC71',
  successDark: '#27AE60',
  background: '#F8F9FE',
  surface: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#666687',
  textWhite: '#FFFFFF',
  danger: '#E74C3C',
  border: '#E8E8F0',
  inputBg: '#F5F5FA',
};

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "სახელი უნდა იყოს მინიმუმ 2 სიმბოლო")
    .max(50, "სახელი ძალიან გრძელია")
    .matches(/^[ა-ჰa-zA-Z\s]+$/, "სახელი უნდა შეიცავდეს მხოლოდ ასოებს")
    .required("სახელი სავალდებულოა"),
  lastName: Yup.string()
    .min(2, "გვარი უნდა იყოს მინიმუმ 2 სიმბოლო")
    .max(50, "გვარი ძალიან გრძელია")
    .matches(/^[ა-ჰa-zA-Z\s]+$/, "გვარი უნდა შეიცავდეს მხოლოდ ასოებს")
    .required("გვარი სავალდებულოა"),
  email: Yup.string()
    .email("გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა")
    .required("ელ-ფოსტა სავალდებულოა"),
  phone: Yup.string()
    .matches(/^[0-9+\s()-]+$/, "გთხოვთ შეიყვანოთ სწორი ტელეფონის ნომერი")
    .min(9, "ტელეფონის ნომერი ძალიან მოკლეა")
    .max(20, "ტელეფონის ნომერი ძალიან გრძელია")
    .required("ტელეფონის ნომერი სავალდებულოა"),
});

export default function EditProfileScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: profileData, isLoading, error, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: profileService.getProfile,
  });

  const updateMutation = useMutation({
    mutationFn: profileService.updateProfile,
    onSuccess: async (data) => {
      await refetch();
      if (data?.success && data.profile) {
        Alert.alert("წარმატება", "პროფილი წარმატებით განახლდა", [
          { text: "კარგი", onPress: () => router.back() },
        ]);
      }
    },
    onError: () => {
      Alert.alert("შეცდომა", "პროფილის განახლება ვერ მოხერხდა");
    },
  });

  const handleSave = (values: { firstName: string; lastName: string; email: string; phone: string }) => {
    updateMutation.mutate(values);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>იტვირთება...</Text>
      </View>
    );
  }

  if (error || !profileData?.success) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Ionicons name="cloud-offline-outline" size={60} color={COLORS.danger} />
        <Text style={styles.errorTextBig}>პროფილის ჩატვირთვა ვერ მოხერხდა</Text>
        <TouchableOpacity onPress={() => refetch()} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>თავიდან ცდა</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const profile = profileData.profile;

  const handleReset = (resetForm: () => void) => {
    Alert.alert("გაუქმება", "დარწმუნებული ხართ რომ გსურთ ცვლილებების გაუქმება?", [
      { text: "არა", style: "cancel" },
      { text: "დიახ", onPress: () => resetForm() },
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textWhite} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <Ionicons name="create" size={32} color={COLORS.textWhite} />
          </View>
          <Text style={styles.headerTitle}>პროფილის რედაქტირება</Text>
          <Text style={styles.headerSubtitle}>შეცვალეთ თქვენი მონაცემები</Text>
        </View>
      </LinearGradient>

      <Formik
        initialValues={{ firstName: profile.firstName, lastName: profile.lastName, email: profile.email, phone: profile.phone }}
        validationSchema={ProfileSchema}
        onSubmit={handleSave}
        validateOnChange={false}
        validateOnBlur={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, resetForm }) => (
          <View style={styles.content}>
            <View style={styles.card}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>სახელი</Text>
                <View style={[styles.inputWrapper, touched.firstName && errors.firstName && styles.inputError]}>
                  <Ionicons name="person-outline" size={20} color={COLORS.primary} style={styles.icon} />
                  <TextInput style={styles.input} value={values.firstName} onChangeText={handleChange("firstName")} onBlur={handleBlur("firstName")} placeholder="შეიყვანეთ სახელი" placeholderTextColor={COLORS.textSecondary} />
                </View>
                {touched.firstName && errors.firstName && <Text style={styles.errorText}>{String(errors.firstName)}</Text>}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>გვარი</Text>
                <View style={[styles.inputWrapper, touched.lastName && errors.lastName && styles.inputError]}>
                  <Ionicons name="person-outline" size={20} color={COLORS.primary} style={styles.icon} />
                  <TextInput style={styles.input} value={values.lastName} onChangeText={handleChange("lastName")} onBlur={handleBlur("lastName")} placeholder="შეიყვანეთ გვარი" placeholderTextColor={COLORS.textSecondary} />
                </View>
                {touched.lastName && errors.lastName && <Text style={styles.errorText}>{String(errors.lastName)}</Text>}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>ელ-ფოსტა</Text>
                <View style={[styles.inputWrapper, touched.email && errors.email && styles.inputError]}>
                  <Ionicons name="mail-outline" size={20} color={COLORS.primary} style={styles.icon} />
                  <TextInput style={styles.input} value={values.email} onChangeText={handleChange("email")} onBlur={handleBlur("email")} placeholder="example@email.com" keyboardType="email-address" autoCapitalize="none" placeholderTextColor={COLORS.textSecondary} />
                </View>
                {touched.email && errors.email && <Text style={styles.errorText}>{String(errors.email)}</Text>}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>ტელეფონის ნომერი</Text>
                <View style={[styles.inputWrapper, touched.phone && errors.phone && styles.inputError]}>
                  <Ionicons name="call-outline" size={20} color={COLORS.primary} style={styles.icon} />
                  <TextInput style={styles.input} value={values.phone} onChangeText={handleChange("phone")} onBlur={handleBlur("phone")} placeholder="+995 555 12 34 56" keyboardType="phone-pad" placeholderTextColor={COLORS.textSecondary} />
                </View>
                {touched.phone && errors.phone && <Text style={styles.errorText}>{String(errors.phone)}</Text>}
              </View>
            </View>

            <TouchableOpacity style={[styles.saveButtonContainer, updateMutation.isPending && styles.disabledButton]} onPress={() => handleSubmit()} disabled={updateMutation.isPending}>
              <LinearGradient colors={[COLORS.success, COLORS.successDark]} style={styles.gradientButton}>
                {updateMutation.isPending ? (
                  <ActivityIndicator size="small" color={COLORS.textWhite} />
                ) : (
                  <>
                    <Ionicons name="checkmark-circle-outline" size={22} color={COLORS.textWhite} />
                    <Text style={styles.buttonText}>შენახვა</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resetButton} onPress={() => handleReset(resetForm)} disabled={updateMutation.isPending}>
              <Ionicons name="refresh-outline" size={22} color={COLORS.textSecondary} />
              <Text style={styles.resetButtonText}>ცვლილებების გაუქმება</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  centered: { justifyContent: 'center', alignItems: 'center' },
  header: { paddingTop: 50, paddingBottom: 30, paddingHorizontal: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  backButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  headerContent: { alignItems: 'center' },
  headerIcon: { width: 70, height: 70, borderRadius: 35, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.textWhite, marginBottom: 4 },
  headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },
  content: { padding: 20, marginTop: -10 },
  card: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 14, color: COLORS.text, marginBottom: 8, fontWeight: '600' },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.inputBg, borderRadius: 12, borderWidth: 2, borderColor: COLORS.border, paddingHorizontal: 14 },
  inputError: { borderColor: COLORS.danger },
  icon: { marginRight: 12 },
  input: { flex: 1, paddingVertical: 14, fontSize: 16, color: COLORS.text },
  errorText: { color: COLORS.danger, fontSize: 12, marginTop: 6, marginLeft: 4 },
  saveButtonContainer: { borderRadius: 12, overflow: 'hidden', marginBottom: 12, shadowColor: COLORS.success, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  gradientButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16 },
  buttonText: { color: COLORS.textWhite, fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  disabledButton: { opacity: 0.6 },
  resetButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, marginBottom: 30 },
  resetButtonText: { color: COLORS.textSecondary, fontSize: 16, fontWeight: '500', marginLeft: 8 },
  loadingText: { marginTop: 12, fontSize: 16, color: COLORS.textSecondary },
  errorTextBig: { fontSize: 16, color: COLORS.danger, textAlign: 'center', marginTop: 12, marginBottom: 20 },
  retryButton: { backgroundColor: COLORS.primary, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10 },
  retryButtonText: { color: COLORS.textWhite, fontSize: 16, fontWeight: 'bold' },
});
