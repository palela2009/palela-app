import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Card from "./Card";

export default function PhoneListScreen() {
  const navigation = useNavigation();

  const phones = [
    { id: "1", title: "iPhone 15", price: 4200, description: "ახალი მოდელი." },
    {
      id: "2",
      title: "Samsung S24",
      price: 3900,
      description: "ბრწყინვალე კამერა.",
    },
    {
      id: "3",
      title: "Xiaomi 14",
      price: 1800,
      description: "კარგი ბალანსი ფასში.",
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={phones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            price={item.price}
            description={item.description}
            onDetailsPress={() =>
              navigation.navigate("PhoneDetails", { phone: item })
            }
          />
        )}
      />

    
      <TouchableOpacity
        style={styles.testButton}
        onPress={() => navigation.navigate("NotFound")}
      >
        <Text style={styles.testButtonText}>ტესტი: NotFound სქრინი</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  testButton: {
    backgroundColor: "#ff6b6b",
    padding: 15,
    margin: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  testButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
