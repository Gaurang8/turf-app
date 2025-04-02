import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import Toast from 'react-native-toast-message';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  // ✅ Check session & validate token expiry
  const checkSession = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      try {

        console.log('Token:', token); // Log the token for debugging

        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          setSession({ user: decoded.name, token });
          console.log('Session valid:', decoded); // Log the user for debugging
        } else {
          Toast.show({
            type: 'error',
            text1: 'Invalid Token',
            text2: 'Session expired, please log in again.',
          });
          await signOut();
        }
      } catch (error) {
        console.error('Invalid token:', error);
        await signOut();
      }
    }
    setLoading(false);
  };

  // ✅ Register User & Auto-Login
  const register = async (name, email, password, confirmPassword) => {


    try {
      const response = await axios.post('https://turf-backend-rvwt.onrender.com/api/v1/user/register', {
        "name": name,
        "value": email,
        "type" : "email",
        "password" : password,
        "confirmPassword" : confirmPassword
      });

      await AsyncStorage.setItem('authToken', response.data.token);
      checkSession(); 
      
      Toast.show({
        type: 'success',
        text1: 'Registration Successful',
        text2: 'Welcome! You are now logged in.',
      });
      
      return response.data; 

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: error.response?.data?.message || 'Please try again.',
      });

      return null; // Return null or handle error as needed
    }
  };


  const signIn = async (email, password) => {
    try {
      const response = await axios.post('https://turf-backend-rvwt.onrender.com/api/v1/user/login', { "value" : email , password });
      
      console.log('Login successful:', response.data);

      const token = response?.data?.token;



      await AsyncStorage.setItem('authToken', token);
      checkSession();

      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'Welcome back!',
      });


      return response.data; // Return user data for further use
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.response?.data?.message || 'Invalid credentials.',
      });
    }
  };

  // const deactivateAccount = async () => {
  //   try {
  //     console.log('Deactivating account...' , session);
  //     const token = await session.token;
  //     await axios.patch(
  //       'https://turf-backend-rvwt.onrender.com/api/v1/user/deactivate-account',
  //       {}, // Empty body
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json',  // Ensure correct content type
  //         },
  //       }
  //     );
      

  //     await AsyncStorage.removeItem('authToken');
  //     setSession(null);

  //     Toast.show({
  //       type: 'success',
  //       text1: 'Account Deactivated',
  //       text2: 'Your account has been deactivated successfully.',
  //     });
  //   } catch (error) {
  //     console.error('Error deactivating account:', error);
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Deactivation Failed',
  //       text2: error.response?.data?.message || 'Please try again.',
  //     });
  //   }
  // }

  // done with fetch not axios
  const deactivateAccount = async () => {
    try {
      console.log('Deactivating account...' , session);
      const token = await session.token;
      const response = await fetch(
        'https://turf-backend-rvwt.onrender.com/api/v1/user/deactivate-account/',
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            // 'Content-Type': 'application/json',  // Ensure correct content type
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to deactivate account');
      }

      await AsyncStorage.removeItem('authToken');
      setSession(null);

      Toast.show({
        type: 'success',
        text1: 'Account Deactivated',
        text2: 'Your account has been deactivated successfully.',
      });
    } catch (error) {
      console.error('Error deactivating account:', error);
      Toast.show({
        type: 'error',
        text1: 'Deactivation Failed',
        text2: error.message || 'Please try again.',
      });
    }
  };

  // ✅ Logout function
  const signOut = async () => {
    await AsyncStorage.removeItem('authToken');
    setSession(null);
    Toast.show({
      type: 'info',
      text1: 'Logged Out',
      text2: 'You have been signed out.',
    });
  };

  return (
    <AuthContext.Provider value={{ session, signIn, register, signOut, loading , deactivateAccount }}>
      {children}
      <Toast />
    </AuthContext.Provider>
  );
};

export default AuthContext;
