import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import 'react-native-reanimated';
import { AuthProvider } from '../context/AuthContext';

import { useColorScheme } from '@/hooks/useColorScheme';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // For persistent login state

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // State to track login status
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const router = useRouter(); 

  useEffect(() => {
    // Check if user is logged in when app starts
    const checkLoginStatus = async () => {

      try {
        const status = await AsyncStorage.getItem('isLoggedIn');
      console.log('Checking login status...' , status);

        if (status === 'true') {
          setIsLoggedIn(true);
          router.push('/');  // Redirect to home page if logged in
        } else {
          setIsLoggedIn(false);
          router.push('/auth/login'); 
        }
      } catch (error) {
        console.error('Error checking login status', error);
        router.push('/auth/login');  // Redirect to login if error occurs
      }
    };

    checkLoginStatus();
    
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (isLoggedIn === null || !loaded) {
    return null;  // Show splash screen until everything is ready
  }

  return (
    <AuthProvider>
    <ThemeProvider value={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}>
      <Stack>
        {/* Check if the user is logged in */}
        {isLoggedIn ? (
          <Stack.Screen name="(tab)" options={{ headerShown: false }} />
        ) : (
          // <Stack.Screen name="auth/login" options={{ headerShown: false }} />
          <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </AuthProvider>
  );
}
