import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, StatusBar, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#FF6B6B',
  primaryDark: '#E55555',
  secondary: '#6C63FF',
  background: '#F8F9FE',
  surface: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#666687',
  textWhite: '#FFFFFF',
  success: '#2ECC71',
  border: '#E8E8F0',
};

export default function LaptopDetailsScreen() {
  const { id, title, price, description, image } = useLocalSearchParams();
  const router = useRouter();

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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image as string }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="laptop" size={80} color={COLORS.textSecondary} />
            </View>
          )}
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.imageOverlay} />
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textWhite} />
          </TouchableOpacity>
          <View style={styles.priceTag}>
            <Text style={styles.priceText}>{price} ₾</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="document-text-outline" size={22} color={COLORS.primary} />
              <Text style={styles.cardTitle}>აღწერა</Text>
            </View>
            <Text style={styles.descriptionText}>{description}</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="settings-outline" size={22} color={COLORS.primary} />
              <Text style={styles.cardTitle}>სპეციფიკაციები</Text>
            </View>
            <View style={styles.specRow}><View style={styles.specIcon}><Ionicons name="hardware-chip-outline" size={18} color={COLORS.primary} /></View><View style={styles.specContent}><Text style={styles.specLabel}>პროცესორი</Text><Text style={styles.specValue}>{specs.processor}</Text></View></View>
            <View style={styles.specRow}><View style={styles.specIcon}><Ionicons name="speedometer-outline" size={18} color={COLORS.primary} /></View><View style={styles.specContent}><Text style={styles.specLabel}>RAM</Text><Text style={styles.specValue}>{specs.ram}</Text></View></View>
            <View style={styles.specRow}><View style={styles.specIcon}><Ionicons name="folder-outline" size={18} color={COLORS.primary} /></View><View style={styles.specContent}><Text style={styles.specLabel}>შენახვა</Text><Text style={styles.specValue}>{specs.storage}</Text></View></View>
            <View style={styles.specRow}><View style={styles.specIcon}><Ionicons name="desktop-outline" size={18} color={COLORS.primary} /></View><View style={styles.specContent}><Text style={styles.specLabel}>ეკრანი</Text><Text style={styles.specValue}>{specs.screen}</Text></View></View>
            <View style={styles.specRow}><View style={styles.specIcon}><Ionicons name="battery-charging-outline" size={18} color={COLORS.primary} /></View><View style={styles.specContent}><Text style={styles.specLabel}>ბატარეა</Text><Text style={styles.specValue}>{specs.battery}</Text></View></View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="information-circle-outline" size={22} color={COLORS.primary} />
              <Text style={styles.cardTitle}>დამატებითი ინფორმაცია</Text>
            </View>
            <View style={styles.specRow}><View style={styles.specIcon}><Ionicons name="color-palette-outline" size={18} color={COLORS.primary} /></View><View style={styles.specContent}><Text style={styles.specLabel}>ფერები</Text><Text style={styles.specValue}>{specs.colors}</Text></View></View>
            <View style={styles.specRow}><View style={styles.specIcon}><Ionicons name="scale-outline" size={18} color={COLORS.primary} /></View><View style={styles.specContent}><Text style={styles.specLabel}>წონა</Text><Text style={styles.specValue}>{specs.weight}</Text></View></View>
            <View style={styles.specRow}><View style={styles.specIcon}><Ionicons name="shield-checkmark-outline" size={18} color={COLORS.primary} /></View><View style={styles.specContent}><Text style={styles.specLabel}>გარანტია</Text><Text style={styles.specValue}>{specs.warranty}</Text></View></View>
            <View style={[styles.specRow, { borderBottomWidth: 0 }]}><View style={styles.specIcon}><Ionicons name="git-branch-outline" size={18} color={COLORS.primary} /></View><View style={styles.specContent}><Text style={styles.specLabel}>პორტები</Text><Text style={styles.specValue}>{specs.ports}</Text></View></View>
          </View>

          <TouchableOpacity style={styles.buyButton}>
            <LinearGradient colors={[COLORS.success, '#27AE60']} style={styles.buyButtonGradient}>
              <Ionicons name="cart-outline" size={24} color={COLORS.textWhite} />
              <Text style={styles.buyButtonText}>შეძენა</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  imageContainer: { position: 'relative', width: '100%', height: 320 },
  image: { width: '100%', height: '100%' },
  imagePlaceholder: { width: '100%', height: '100%', backgroundColor: COLORS.border, justifyContent: 'center', alignItems: 'center' },
  imageOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 100 },
  backButton: { position: 'absolute', top: 50, left: 20, width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  priceTag: { position: 'absolute', bottom: 20, right: 20, backgroundColor: COLORS.primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 25 },
  priceText: { fontSize: 20, fontWeight: 'bold', color: COLORS.textWhite },
  content: { padding: 20, marginTop: -20, borderTopLeftRadius: 25, borderTopRightRadius: 25, backgroundColor: COLORS.background },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.text, marginBottom: 20 },
  card: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 20, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, marginLeft: 10 },
  descriptionText: { fontSize: 15, color: COLORS.textSecondary, lineHeight: 24 },
  specRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  specIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: `${COLORS.primary}15`, justifyContent: 'center', alignItems: 'center' },
  specContent: { marginLeft: 14, flex: 1 },
  specLabel: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 2, textTransform: 'uppercase', letterSpacing: 0.5 },
  specValue: { fontSize: 15, color: COLORS.text, fontWeight: '500' },
  buyButton: { borderRadius: 14, overflow: 'hidden', marginBottom: 30, shadowColor: COLORS.success, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  buyButtonGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18 },
  buyButtonText: { fontSize: 18, fontWeight: 'bold', color: COLORS.textWhite, marginLeft: 10 },
});
