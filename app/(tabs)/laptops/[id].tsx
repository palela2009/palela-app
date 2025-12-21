import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function LaptopDetailsScreen() {
  const { id, title, price, description } = useLocalSearchParams();

  const getLaptopSpecs = (laptopTitle: string) => {
    const specs: Record<string, any> = {
      "MacBook Air M3": {
        processor: "Apple M3 ჩიპი",
        ram: "8GB / 16GB / 24GB",
        storage: "256GB / 512GB / 1TB SSD",
        screen: "13.6 ინჩი Liquid Retina",
        battery: "18 საათამდე",
        colors: "ვერცხლისფერი, ღია ნაცრისფერი, ღია თოვლისფერი",
        weight: "1.24 კგ",
        warranty: "1 წელი",
        ports: "2x USB-C (Thunderbolt), MagSafe 3",
      },
      "Asus TUF": {
        processor: "Intel Core i7-13700H",
        ram: "16GB / 32GB DDR5",
        storage: "512GB / 1TB NVMe SSD",
        screen: "15.6 ინჩი FHD 144Hz",
        battery: "6-8 საათი გეიმინგზე",
        colors: "შავი, რუხი",
        weight: "2.2 კგ",
        warranty: "2 წელი",
        ports: "USB-C, USB 3.2, HDMI 2.1, RJ45",
      },
      "HP Spectre": {
        processor: "Intel Core i7-1355U",
        ram: "16GB / 32GB LPDDR4x",
        storage: "512GB / 1TB PCIe SSD",
        screen: "13.5 ინჩი OLED 3K2K",
        battery: "10-12 საათი",
        colors: "ნოქტირნალ ლურჯი, ბორდო ოქრო",
        weight: "1.36 კგ",
        warranty: "1 წელი",
        ports: "2x Thunderbolt 4, USB-A, MicroSD",
      },
    };
    return specs[laptopTitle] || specs["MacBook Air M3"];
  };

  const specs = getLaptopSpecs(title as string);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsCard}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>ფასი: {price} ₾</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>აღწერა:</Text>
          <Text style={styles.text}>{description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>სპეციფიკაციები:</Text>
          <Text style={styles.text}>• პროცესორი: {specs.processor}</Text>
          <Text style={styles.text}>• RAM: {specs.ram}</Text>
          <Text style={styles.text}>• შენახვა: {specs.storage}</Text>  
          <Text style={styles.text}>• ეკრანი: {specs.screen}</Text>
          <Text style={styles.text}>• ბატარეა: {specs.battery}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>დამატებითი ინფორმაცია:</Text>
          <Text style={styles.text}>• ფერები: {specs.colors}</Text>
          <Text style={styles.text}>• წონა: {specs.weight}</Text>
          <Text style={styles.text}>• გარანტია: {specs.warranty}</Text>
          <Text style={styles.text}>• პორტები: {specs.ports}</Text>
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
