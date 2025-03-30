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
   
    <Text style={{ fontSize: 20, marginTop: 20 , paddingInline: 20 }}>
      {session ? `Welcome back, ${session.user}` : 'Please log in'}
    </Text>
    
  );
}

const styles = StyleSheet.create({
});
