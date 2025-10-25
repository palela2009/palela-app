import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function PhoneDetailsScreen() {
  const route = useRoute();
  const { phone } = route.params || {};

  
  const getPhoneSpecs = (phoneTitle) => {
    const specs = {
      "iPhone 15": {
        screen: "6.1 ინჩი OLED",
        processor: "A17 Pro",
        camera: "48MP მთავარი",
        battery: "მთელი დღე მუშაობა",
        memory: "128GB / 256GB / 512GB",
        colors: "შავი, თეთრი, ლურჯი",
        warranty: "1 წელი",
        waterproof: "IP68",
      },
      "Samsung S24": {
        screen: "6.2 ინჩი AMOLED",
        processor: "Snapdragon 8 Gen 3",
        camera: "50MP ძირითადი, 12MP ულტრა ფართო",
        battery: "4000mAh, სწრაფი დატენვა",
        memory: "256GB / 512GB",
        colors: "ვიოლეტი, შავი, ნაცრისფერი",
        warranty: "2 წელი",
        waterproof: "IP68",
      },
      "Xiaomi 14": {
        screen: "6.36 ინჩი AMOLED",
        processor: "Snapdragon 8 Gen 2",
        camera: "50MP Leica ოპტიკა",
        battery: "4610mAh, 90W დატენვა",
        memory: "128GB / 256GB",
        colors: "შავი, თეთრი, მწვანე",
        warranty: "1 წელი",
        waterproof: "IP68",
      },
    };
    return specs[phoneTitle] || specs["iPhone 15"];
  };

  const specs = getPhoneSpecs(phone?.title);

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
          <Text style={styles.text}>• ეკრანი: {specs.screen}</Text>
          <Text style={styles.text}>• პროცესორი: {specs.processor}</Text>
          <Text style={styles.text}>• კამერა: {specs.camera}</Text>
          <Text style={styles.text}>• ბატარეა: {specs.battery}</Text>
          <Text style={styles.text}>• მეხსიერება: {specs.memory}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>დამატებითი ინფორმაცია:</Text>
          <Text style={styles.text}>• ფერები: {specs.colors}</Text>
          <Text style={styles.text}>• გარანტია: {specs.warranty}</Text>
          <Text style={styles.text}>• წყალგაუმტარობა: {specs.waterproof}</Text>
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
