import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ImageBackground 
} from 'react-native';
import { Link } from 'expo-router';
import { useSession } from '@/hooks/useSession';

export default function SignupScreen({ navigation  } : any) {
  const { session , signOut } = useSession();

  console.log("session " ,session)

  return (
   <Text>
    <Link href="/auth/login" style={{ color: 'blue', fontSize: 20, fontWeight: 'bold' }}>
      Go to Login
    </Link>
    <Text style={{ fontSize: 20, marginTop: 20 }}>
      {session ? `Welcome back, ${session.user}` : 'Please log in'}
    </Text>
    {/* logout */}
    
    <TouchableOpacity onPress={signOut} style={{ marginTop: 20, padding: 10, backgroundColor: 'red' }} >
      <Text style={{ color: 'white', fontSize: 20 }}>Logout</Text>
    </TouchableOpacity>
    
   </Text>
  );
}

const styles = StyleSheet.create({
});
