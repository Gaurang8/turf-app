import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";

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
        name, email, password, confirmPassword,
      });

      await AsyncStorage.setItem('authToken', response.data.token);
      checkSession(); 

      return response.data; 

    } catch (error) {
      console.error('Registration failed:', error);

      return null; // Return null or handle error as needed
    }
  };


  const signIn = async (email, password) => {
    try {
      const response = await axios.post('https://turf-backend-rvwt.onrender.com/api/v1/user/login', { email, password });
      
      console.log('Login successful:', response.data);

      const token = response?.data?.token;



      await AsyncStorage.setItem('authToken', token);
      checkSession();


      return response.data; // Return user data for further use
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // ✅ Logout function
  const signOut = async () => {
    await AsyncStorage.removeItem('authToken');
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, signIn, register, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
