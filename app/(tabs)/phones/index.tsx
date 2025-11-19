import React from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import Card from "../../../components/Card";
import { useProfile } from "../../../contexts/ProfileContext";

export default function PhoneListScreen() {
  const router = useRouter();
  const { profile } = useProfile(); 
  
  const phones = [
    { 
      id: "1", 
      title: "iPhone 15", 
      price: 4200, 
      description: "ახალი მოდელი.",
      image: "https://images.unsplash.com/photo-1695048064467-44abd0d3e16f?w=300&h=300&fit=crop"
    },
    { 
      id: "2", 
      title: "Samsung S24", 
      price: 3900, 
      description: "ბრწყინვალე კამერა.",
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop"
    },
    { 
      id: "3", 
      title: "Xiaomi 14", 
      price: 1800, 
      description: "კარგი ბალანსი ფასში.",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=300&fit=crop"
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>გამარჯობა, {profile.firstName}! 👋</Text>
      </View>
      <FlatList
        data={phones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            price={item.price}
            description={item.description}
            image={item.image}
            onDetailsPress={() => router.push(`/phones/${item.id}?title=${item.title}&price=${item.price}&description=${item.description}`)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
