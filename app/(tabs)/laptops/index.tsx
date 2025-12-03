import React, { useEffect } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, Text, ActivityIndicator, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import Card from "../../../components/Card";
import { useProfile } from "../../../contexts/ProfileContext";
import { useLaptops } from "../../../api/laptops/useLaptops";

export default function LaptopListScreen() {
  const router = useRouter();
  const { profile } = useProfile(); 
  const { data: laptops, isLoading, error, refetch, isRefetching } = useLaptops();

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>იტვირთება...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>{error.message}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>თავიდან ცდა</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>გამარჯობა, {profile.firstName}! 👋</Text>
        <Text style={styles.subText}>ლეპტოპები შენთვის</Text>
      </View>
      <FlatList
        data={laptops}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            price={item.price}
            description={item.description}
            image={item.image}
            onDetailsPress={() => router.push(`/laptops/${item._id}?title=${item.title}&price=${item.price}&description=${item.description}`)}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => refetch()}
            colors={["#007AFF"]}
            tintColor="#007AFF"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
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
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "#d32f2f",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
