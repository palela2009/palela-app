import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NotFoundScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle-outline" size={100} color="#ff6b6b" />
      <Text style={styles.title}>404</Text>
      <Text style={styles.subtitle}>გვერდი ვერ მოიძებნა</Text>
      <Text style={styles.description}>
        სამწუხაროდ, თქვენ მიერ მოთხოვნილი გვერდი არ არსებობს.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Phones")}
      >
        <Text style={styles.buttonText}>დაბრუნება მთავარზე</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#ff6b6b",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 30,
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#007bff",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
