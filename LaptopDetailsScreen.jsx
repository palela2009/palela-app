import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function LaptopDetailsScreen({ route }) {
  const { laptop } = route.params || {};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsCard}>
        <Text style={styles.title}>{laptop?.title || "MacBook Air M3"}</Text>
        <Text style={styles.price}>ფასი: {laptop?.price || 5000} ₾</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>აღწერა:</Text>
          <Text style={styles.text}>
            {laptop?.description ||
              "ძლიერი და მსუბუქი ლეპტოპი პროფესიონალებისთვის."}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>სპეციფიკაციები:</Text>
          <Text style={styles.text}>• პროცესორი: M3 ჩიპი</Text>
          <Text style={styles.text}>• RAM: 8GB / 16GB</Text>
          <Text style={styles.text}>• შენახვა: 256GB / 512GB SSD</Text>
          <Text style={styles.text}>• ეკრანი: 13.6 ინჩი Retina</Text>
          <Text style={styles.text}>• ბატარეა: 18 საათამდე</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>დამატებითი ინფორმაცია:</Text>
          <Text style={styles.text}>• ფერები: ვერცხლი, ნაცრისფერი</Text>
          <Text style={styles.text}>• წონა: 1.24 კგ</Text>
          <Text style={styles.text}>• გარანტია: 1 წელი</Text>
          <Text style={styles.text}>• პორტები: 2x USB-C, MagSafe</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  detailsCard: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  price: {
    fontSize: 20,
    color: "#007bff",
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  text: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
    lineHeight: 24,
  },
});
