import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
export default function Card({ title, price, description, onDetailsPress }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>ფასი: {price} ₾</Text>
      <Text style={styles.desc}>{description}</Text>
      <TouchableOpacity style={styles.button} onPress={onDetailsPress}>
        <Text style={styles.buttonText}>დეტალები</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    color: "#007bff",
    fontSize: 16,
    marginTop: 5,
  },
  desc: {
    marginTop: 5,
    color: "#555",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
