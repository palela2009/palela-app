import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useProfile } from "../../../contexts/ProfileContext";
import { useAuth } from "../../../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { profileService } from "../../../services/api";

const COLORS = {
  primary: '#6C63FF',
  primaryDark: '#5A52D5',
  secondary: '#FF6B6B',
  success: '#2ECC71',
  background: '#F8F9FE',
  surface: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#666687',
  textWhite: '#FFFFFF',
  danger: '#E74C3C',
  border: '#E8E8F0',
};

export default function ProfileScreen() {
  const router = useRouter();
  const { profile, dispatch } = useProfile();
  const { logout } = useAuth();

  const { data: profileData, isLoading, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: profileService.getProfile,
  });

  useEffect(() => {
    if (profileData?.success && profileData.profile) {
      dispatch({
        type: "LOAD_USER",
        user: {
          firstName: profileData.profile.firstName,
          lastName: profileData.profile.lastName,
          email: profileData.profile.email,
          phone: profileData.profile.phone || '',
        },
      });
    }
  }, [profileData]);

  const handleLogout = async () => {
    Alert.alert(
      "გასვლა",
      "დარწმუნებული ხართ რომ გსურთ სისტემიდან გასვლა?",
      [
        { text: "გაუქმება", style: "cancel" },
        {
          text: "გასვლა",
          style: "destructive",
          onPress: async () => {
            try {
              await logout();
              router.replace("/login");
            } catch (error) {
              Alert.alert("შეცდომა", "გასვლისას მოხდა შეცდომა");
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>იტვირთება...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={50} color={COLORS.primary} />
          </View>
          <View style={styles.statusBadge}>
            <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
          </View>
        </View>
        <Text style={styles.name}>{profile.firstName} {profile.lastName}</Text>
        <Text style={styles.email}>{profile.email}</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>პროფილის ინფორმაცია</Text>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="person-outline" size={22} color={COLORS.primary} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.label}>სახელი</Text>
              <Text style={styles.value}>{profile.firstName}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="person-outline" size={22} color={COLORS.primary} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.label}>გვარი</Text>
              <Text style={styles.value}>{profile.lastName}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="mail-outline" size={22} color={COLORS.primary} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.label}>ელ-ფოსტა</Text>
              <Text style={styles.value}>{profile.email}</Text>
            </View>
          </View>

          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <View style={styles.iconContainer}>
              <Ionicons name="call-outline" size={22} color={COLORS.primary} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.label}>ტელეფონი</Text>
              <Text style={styles.value}>{profile.phone || 'არ არის მითითებული'}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.editButton} onPress={() => router.push('/profile/edit')}>
          <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.gradientButton}>
            <Ionicons name="create-outline" size={22} color={COLORS.textWhite} />
            <Text style={styles.editButtonText}>პროფილის რედაქტირება</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color={COLORS.danger} />
          <Text style={styles.logoutButtonText}>გასვლა</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  centered: { justifyContent: 'center', alignItems: 'center' },
  header: { paddingTop: 60, paddingBottom: 40, alignItems: 'center', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  avatarContainer: { position: 'relative', marginBottom: 16 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 8 },
  statusBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: COLORS.surface, borderRadius: 12, padding: 2 },
  name: { fontSize: 26, fontWeight: 'bold', color: COLORS.textWhite, marginBottom: 4 },
  email: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },
  content: { padding: 20, marginTop: -10 },
  card: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, marginBottom: 20 },
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  iconContainer: { width: 44, height: 44, borderRadius: 12, backgroundColor: `${COLORS.primary}15`, justifyContent: 'center', alignItems: 'center' },
  infoText: { marginLeft: 16, flex: 1 },
  label: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  value: { fontSize: 16, color: COLORS.text, fontWeight: '500' },
  editButton: { borderRadius: 12, overflow: 'hidden', marginBottom: 12, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  gradientButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16 },
  editButtonText: { color: COLORS.textWhite, fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  logoutButton: { flexDirection: 'row', backgroundColor: COLORS.surface, paddingVertical: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: COLORS.danger, marginBottom: 30 },
  logoutButtonText: { color: COLORS.danger, fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  loadingText: { marginTop: 12, fontSize: 16, color: COLORS.textSecondary },
});
