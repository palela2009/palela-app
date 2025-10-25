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

export default function LaptopListScreen() {
  const navigation = useNavigation();

  const laptops = [
    {
      id: "1",
      title: "MacBook Air M3",
      price: 5000,
      description: "ძლიერი და მსუბუქი.",
    },
    {
      id: "2",
      title: "Asus TUF",
      price: 4200,
      description: "გეიმინგისთვის შესაფერისი.",
    },
    {
      id: "3",
      title: "HP Spectre",
      price: 4700,
      description: "პროფესიონალური დიზაინი.",
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={laptops}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            price={item.price}
            description={item.description}
            onDetailsPress={() =>
              navigation.navigate("LaptopDetails", { laptop: item })
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
