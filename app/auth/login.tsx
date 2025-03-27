import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For eye icon
import { Link, useRouter } from 'expo-router'; // `useRouter` is used for navigation in the new `expo-router`
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSession } from '../../hooks/useSession';


export default function SignupScreen() {
  const { signIn } = useSession();
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); // Using `useRouter` from `expo-router` to navigate

  const handleSubmit = async () => {
    if (!contact || !password) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
  

    let res = await signIn(contact, password)

    router.push('/');  // Navigate to the home screen

    return;

    // Default login credentials
    if (contact === '1111' && password === '1111') {
      Alert.alert('Success', 'Logged in successfully!');
      
      // Store login status in AsyncStorage
      try {
        await AsyncStorage.setItem('isLoggedIn', 'true');
      } catch (error) {
        console.error('Error saving login status', error);
      }
      
    } else {
      Alert.alert('Error', 'Invalid credentials.');
    }


    // onPress={() => signIn(email, password)}

  };
  

  return (
    <ImageBackground 
      source={require('../../assets/images/bg-signup1.png')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image source={require('../../assets/images/logo1.png')} style={styles.logo} />

        <Text style={styles.title}>Log In</Text>

        <Text style={styles.label}>Email/Phone Number</Text>
        <TextInput
          style={styles.input}
          value={contact}
          onChangeText={setContact}
          placeholder="Enter email/phone"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupButton} onPress={handleSubmit}>
          <Text style={styles.signupButtonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.signupTextContainer}>
          <Text style={styles.normalText}>Don't have an account? </Text>
          <Text style={styles.linkText}>
            <Link href='/'>Register</Link>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 150,
    marginBottom: 10,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end', 
    marginBottom: 5,
  },
  forgotPasswordText: {
    color: '#191970', // Midnight Blue
    fontSize: 14,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupTextContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  normalText: {
    fontSize: 16,
    color: 'black', 
  },
  linkText: {
    fontSize: 16,
    color: '#191970', // Midnight Blue
    fontWeight: 'bold',
  },
});
