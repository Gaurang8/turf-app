import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

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
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          setSession({ user: decoded.user, token });
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
  const register = async (username, email, password, contact) => {
    try {
      const response = await axios.post('https://turf-backend-rvwt.onrender.com/api/v1/user/register', {
        username, email, password, contact,
      });

      const token = response.data.token;
      await AsyncStorage.setItem('authToken', token);
      checkSession(); // Auto-login after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  // ✅ Login function
  const signIn = async (email, password) => {
    try {
      const response = await axios.post('https://turf-backend-rvwt.onrender.com/api/v1/user/login', { email, password });
      const token = response.data.token;

      await AsyncStorage.setItem('authToken', token);
      checkSession();
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
