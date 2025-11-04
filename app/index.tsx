import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../contexts/AuthContext";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function Index() {
  const router = useRouter();
  const { authState } = useAuth();

  useEffect(() => {
    if (authState.isAuthenticated) {
      router.replace("/(tabs)/phones");
    } else {
      router.replace("/login");
    }
  }, [authState.isAuthenticated]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007bff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});
