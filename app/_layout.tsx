import { Stack, useRouter } from 'expo-router';
import { ProfileProvider } from '../contexts/ProfileContext';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

export default function RootLayout() {
  const router = useRouter();
  const { authState } = useAuth();

  // useEffect(() => {
  //   console.log(authState?.isAuthenticated)
  //   if (authState?.isAuthenticated) {
  //     router.replace("/(tabs)/phones");
  //   } else {
  //     router.replace("/login");
  //     console.log("shemodis")
  //   }
  // }, [authState]);

  return (
    <AuthProvider>
      <ProfileProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ProfileProvider>
    </AuthProvider>
  );
}
