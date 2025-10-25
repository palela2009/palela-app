import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
export default function Card({ title, price, description }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>ფასი: {price} ₾</Text>
      <Text style={styles.desc}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    color: '#007bff',
  },
  desc: {
    marginTop: 5,
    color: '#555',
  },
});
