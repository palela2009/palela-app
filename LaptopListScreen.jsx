import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Card from "./Card";

export default function LaptopListScreen({ navigation }) {
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});
