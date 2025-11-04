import React from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import Card from "../../../components/Card";
import { useProfile } from "../../../contexts/ProfileContext";

export default function LaptopListScreen() {
  const router = useRouter();
  const { profile } = useProfile(); 
  
  const laptops = [
    { id: "1", title: "MacBook Air M3", price: 5000, description: "ძლიერი და მსუბუქი." },
    { id: "2", title: "Asus TUF", price: 4200, description: "გეიმინგისთვის შესაფერისი." },
    { id: "3", title: "HP Spectre", price: 4700, description: "პროფესიონალური დიზაინი." },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>გამარჯობა, {profile.firstName}! 👋</Text>
        <Text style={styles.subText}>ლეპტოპები შენთვის</Text>
      </View>
      <FlatList
        data={laptops}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            price={item.price}
            description={item.description}
            onDetailsPress={() => router.push(`/laptops/${item.id}?title=${item.title}&price=${item.price}&description=${item.description}`)}
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
  subText: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});
