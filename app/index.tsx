import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../contexts/AuthContext";
import { useProfile } from "../contexts/ProfileContext";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function Index() {
  const router = useRouter();
  const { authState, loadStoredUser } = useAuth();
  const { dispatch: profileDispatch } = useProfile();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkStoredUser();
  }, []);

  const checkStoredUser = async () => {
    try {
      await loadStoredUser();
      
      setTimeout(() => {
        if (authState.isAuthenticated && authState.currentUser) {
          profileDispatch({
            type: "LOAD_USER",
            user: {
              firstName: authState.currentUser.firstName,
              lastName: authState.currentUser.lastName,
              email: authState.currentUser.email,
              phone: authState.currentUser.phone,
            },
          });
          router.replace("/(tabs)/phones");
        } else {
          router.replace("/login");
        }
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error checking stored user:", error);
      router.replace("/login");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});
