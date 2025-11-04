import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useProfile } from "../../../contexts/ProfileContext";

export default function ProfileScreen() {
  const router = useRouter();
  const { profile } = useProfile();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={100} color="#007bff" />
        </View>
        <Text style={styles.name}>
          {profile.firstName} {profile.lastName}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>პროფილის ინფორმაცია</Text>

        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={24} color="#666" />
          <View style={styles.infoText}>
            <Text style={styles.label}>სახელი</Text>
            <Text style={styles.value}>{profile.firstName}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={24} color="#666" />
          <View style={styles.infoText}>
            <Text style={styles.label}>გვარი</Text>
            <Text style={styles.value}>{profile.lastName}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={24} color="#666" />
          <View style={styles.infoText}>
            <Text style={styles.label}>ელ-ფოსტა</Text>
            <Text style={styles.value}>{profile.email}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={24} color="#666" />
          <View style={styles.infoText}>
            <Text style={styles.label}>ტელეფონი</Text>
            <Text style={styles.value}>{profile.phone}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => router.push('/profile/edit')}
      >
        <Ionicons name="create-outline" size={20} color="#fff" />
        <Text style={styles.editButtonText}>პროფილის რედაქტირება</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 30,
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoText: {
    marginLeft: 15,
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#999",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  editButton: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    marginHorizontal: 15,
    marginBottom: 30,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
