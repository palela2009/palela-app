import React, { useEffect } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import Card from "../../../components/Card";
import { useProfile } from "../../../contexts/ProfileContext";
import { useProduct } from "../../../contexts/ProductContext";
import { phoneService } from "../../../services/api";

export default function PhoneListScreen() {
  const router = useRouter();
  const { profile } = useProfile(); 
  const { state, dispatch } = useProduct();

  useEffect(() => {
    loadPhones();
  }, []);

  const loadPhones = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const data = await phoneService.getAll();
      dispatch({ type: "SET_PHONES", payload: data });
    } catch (error) {
      console.error("Error loading phones:", error);
      dispatch({ type: "SET_ERROR", payload: "Failed to load phones" });
    }
  };

  if (state.loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>იტვირთება...</Text>
      </View>
    );
  }

  if (state.error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>{state.error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadPhones}>
          <Text style={styles.retryText}>თავიდან ცდა</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>გამარჯობა, {profile.firstName}! 👋</Text>
      </View>
      <FlatList
        data={state.phones}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            price={item.price}
            description={item.description}
            image={item.image}
            onDetailsPress={() => router.push(`/phones/${item._id}?title=${item.title}&price=${item.price}&description=${item.description}`)}
          />
        )}
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
