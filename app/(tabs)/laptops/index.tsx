import React from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, Text, ActivityIndicator, RefreshControl, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Card from "../../../components/Card";
import { useProfile } from "../../../contexts/ProfileContext";
import { useLaptops } from "../../../api/laptops/useLaptops";
import { LinearGradient } from "expo-linear-gradient";

const COLORS = {
  primary: '#FF6B6B',
  primaryDark: '#E55555',
  background: '#F8F9FE',
  surface: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#666687',
  textWhite: '#FFFFFF',
  error: '#E74C3C',
};

export default function LaptopListScreen() {
  const router = useRouter();
  const { profile } = useProfile();
  const { data: laptops, isLoading, error, refetch, isRefetching } = useLaptops();

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>იტვირთება...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Ionicons name="cloud-offline-outline" size={60} color={COLORS.error} />
        <Text style={styles.errorText}>{error.message}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>თავიდან ცდა</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>გამარჯობა, {profile.firstName}! 👋</Text>
            <Text style={styles.subGreeting}>აირჩიეთ ლეპტოპი</Text>
          </View>
          <View style={styles.headerIcon}>
            <Ionicons name="laptop" size={28} color={COLORS.textWhite} />
          </View>
        </View>
      </LinearGradient>

      <FlatList
        data={laptops}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            price={item.price}
            description={item.description}
            image={item.image}
            onDetailsPress={() => router.push(`/laptops/${item._id}?title=${item.title}&price=${item.price}&description=${item.description}&image=${encodeURIComponent(item.image)}`)}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={() => refetch()} colors={[COLORS.primary]} tintColor={COLORS.primary} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  centered: { justifyContent: "center", alignItems: "center" },
  header: { paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { fontSize: 22, fontWeight: "bold", color: COLORS.textWhite },
  subGreeting: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  headerIcon: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  listContent: { paddingTop: 20, paddingBottom: 20 },
  loadingText: { marginTop: 12, fontSize: 16, color: COLORS.textSecondary },
  errorText: { fontSize: 16, color: COLORS.error, textAlign: "center", marginTop: 12, marginBottom: 20 },
  retryButton: { backgroundColor: COLORS.primary, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10 },
  retryText: { color: COLORS.textWhite, fontSize: 16, fontWeight: "bold" },
});
