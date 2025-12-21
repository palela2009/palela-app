import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService } from "../../../services/api";

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
    onSuccess: async () => {
      await refetch();
      Alert.alert("წარმატება", "პროფილი წარმატებით განახლდა", [
        {
          text: "კარგი",
          onPress: () => router.back(),
        },
      ]);
    },
    onError: () => {
      Alert.alert("შეცდომა", "პროფილის განახლება ვერ მოხერხდა");
    },
  });

  const handleSave = (values: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => {
    updateMutation.mutate(values);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error || !profileData?.success) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>პროფილის ჩატვირთვა ვერ მოხერხდა</Text>
        <TouchableOpacity onPress={() => refetch()} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>თავიდან ცდა</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const profile = profileData.profile;

  const handleReset = (resetForm: () => void) => {
    Alert.alert(
      "გაუქმება",
      "დარწმუნებული ხართ რომ გსურთ ცვლილებების გაუქმება?",
      [
        { text: "არა", style: "cancel" },
        {
          text: "დიახ",
          onPress: () => resetForm(),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          phone: profile.phone,
        }}
        validationSchema={ProfileSchema}
        onSubmit={handleSave}
        validateOnChange={false}
        validateOnBlur={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, resetForm }) => (
          <>
            <View style={styles.card}>
              <Text style={styles.title}>პროფილის რედაქტირება</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>სახელი</Text>
                <View style={[styles.inputWrapper, touched.firstName && errors.firstName && styles.inputError]}>
                  <Ionicons name="person-outline" size={20} color="#666" style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    value={values.firstName}
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    placeholder="შეიყვანეთ სახელი"
                  />
                </View>
                {touched.firstName && errors.firstName && (
                  <Text style={styles.errorText}>{String(errors.firstName)}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>გვარი</Text>
                <View style={[styles.inputWrapper, touched.lastName && errors.lastName && styles.inputError]}>
                  <Ionicons name="person-outline" size={20} color="#666" style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    value={values.lastName}
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    placeholder="შეიყვანეთ გვარი"
                  />
                </View>
                {touched.lastName && errors.lastName && (
                  <Text style={styles.errorText}>{String(errors.lastName)}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>ელ-ფოსტა</Text>
                <View style={[styles.inputWrapper, touched.email && errors.email && styles.inputError]}>
                  <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    placeholder="example@email.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{String(errors.email)}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>ტელეფონის ნომერი</Text>
                <View style={[styles.inputWrapper, touched.phone && errors.phone && styles.inputError]}>
                  <Ionicons name="call-outline" size={20} color="#666" style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    value={values.phone}
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    placeholder="+995 555 12 34 56"
                    keyboardType="phone-pad"
                  />
                </View>
                {touched.phone && errors.phone && (
                  <Text style={styles.errorText}>{String(errors.phone)}</Text>
                )}
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button, 
                  styles.saveButton,
                  updateMutation.isPending && styles.disabledButton
                ]}
                onPress={() => handleSubmit()}
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
                    <Text style={styles.buttonText}>შენახვა</Text>
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.resetButton]}
                onPress={() => handleReset(resetForm)}
                disabled={updateMutation.isPending}
              >
                <Ionicons name="refresh-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>გაუქმება</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 12,
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
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    color: "#dc3545",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  buttonContainer: {
    marginHorizontal: 15,
    marginBottom: 30,
  },
  button: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#28a745",
  },
  resetButton: {
    backgroundColor: "#6c757d",
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  retryButton: {
    marginTop: 10,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
