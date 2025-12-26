import { Stack, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { ProfileProvider } from '../contexts/ProfileContext';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { ProductProvider } from '../contexts/ProductContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { View, ActivityIndicator } from 'react-native';
import { useEffect } from 'react';

const queryClient = new QueryClient();

function NavigationHandler() {
  const { authState } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return;
    if (authState.isLoading) return;

    const inAuthGroup = segments[0] === '(tabs)';

    if (!authState.isAuthenticated && inAuthGroup) {
      router.replace('/login');
    } else if (authState.isAuthenticated && !inAuthGroup && segments[0] !== 'login' && segments[0] !== 'register') {
      router.replace('/(tabs)/phones');
    }
  }, [authState.isAuthenticated, authState.isLoading, segments, navigationState?.key]);

  if (authState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProfileProvider>
          <ProductProvider>
            <NavigationHandler />
          </ProductProvider>
        </ProfileProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
