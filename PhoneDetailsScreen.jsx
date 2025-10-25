import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function PhoneDetailsScreen({ route }) {
  const { phone } = route.params || {};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsCard}>
        <Text style={styles.title}>{phone?.title || "iPhone 15"}</Text>
        <Text style={styles.price}>ფასი: {phone?.price || 4200} ₾</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>აღწერა:</Text>
          <Text style={styles.text}>
            {phone?.description || "ახალი მოდელი უახლესი ტექნოლოგიებით."}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>სპეციფიკაციები:</Text>
          <Text style={styles.text}>• ეკრანი: 6.1 ინჩი OLED</Text>
          <Text style={styles.text}>• პროცესორი: A17 Pro</Text>
          <Text style={styles.text}>• კამერა: 48MP მთავარი</Text>
          <Text style={styles.text}>• ბატარეა: მთელი დღე მუშაობა</Text>
          <Text style={styles.text}>• მეხსიერება: 128GB / 256GB / 512GB</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>დამატებითი ინფორმაცია:</Text>
          <Text style={styles.text}>• ფერები: შავი, თეთრი, ლურჯი</Text>
          <Text style={styles.text}>• გარანტია: 1 წელი</Text>
          <Text style={styles.text}>• წყალგაუმტარობა: IP68</Text>
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
