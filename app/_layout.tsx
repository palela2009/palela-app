import { Stack, useRouter } from 'expo-router';
import { ProfileProvider } from '../contexts/ProfileContext';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { ProductProvider } from '../contexts/ProductContext';
import { useEffect } from 'react';

export default function RootLayout() {
  const router = useRouter();
  const { authState } = useAuth();

  return (
    <AuthProvider>
      <ProfileProvider>
        <ProductProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </ProductProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}
