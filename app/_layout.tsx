import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { AuthProvider } from '../context/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSession } from '@/hooks/useSession';

const LightTheme = {
  ...DefaultTheme, // Use the default light theme
  dark: false, // Disable dark mode
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF', // Force light background
    text: '#000000', // Dark text for visibility
  },
};


SplashScreen.preventAutoHideAsync();

function RootLayoutWrapper() {
  const { session, loading } = useSession();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
      setIsMounted(true); // Mark layout as mounted
    }
  }, [loading]);

  useEffect(() => {
    if (isMounted) {
      if (!session) {
        router.replace("/auth/login"); // Navigate only after mounting
      }
    }
  }, [isMounted, session, router]);

  if (loading || !isMounted) {
    return null; // Show splash screen until authentication is checked
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? LightTheme : LightTheme}>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutWrapper />
    </AuthProvider>
  );
}
