export const unstable_settings = {
  initialRouteName: 'index',
  skipInitialRender: true,
};

import { router, Tabs } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Drawer, Icon, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import BlurTabBarBackground from '@/components/ui/TabBarBackground.ios';
import confirmPage from '@/app/tabs/confirm'



export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  const activeTintColor = Colors[colorScheme ?? 'light'].tint;
  const inactiveTintColor = Colors[colorScheme ?? 'light'].text;




  const userTabs = [
    {
      name: 'index',
      title: 'Home',
      iconName: 'house.fill',
    },
    {
      name: 'confirm',
      title: 'confirm',
      iconName: 'gearshape.fill',
    },
    {
      name: 'booklist',
      title: 'Bookings',
      iconName: 'list.fill',
    },
    {
      name: 'about',
      title: 'About us',
      iconName: 'person.fill',
    },

    // admin
    // {
    //   name: 'dashboard',
    //   title: 'Dashboard',
    //   iconName: 'dashboard',
    // },
    // {
    //   name: 'confirm',
    //   title: 'Confirm',
    //   iconName: 'person.fill',
    // },
    // {
    //   name: 'booklist',
    //   title: 'Booking List',
    //   iconName: 'person.fill',
    // },
    // {
    //   name: 'admin_list',
    //   title: 'Admin List',
    //   iconName: 'person.fill',
    // },
    
  ];


  

  return (
    <View style={styles.container}>
      {/* Custom Sticky Header */}
      <LinearGradient
        colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.9)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.header}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/logo1.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity  style={styles.menuButton}
          onPress={() => {
            router.push('/profile');
          }}
        >
          <Icon
            source="account"
            color={"#000"}
            size={28}
          />
        </TouchableOpacity>
      </LinearGradient>



      {/* Tab Navigation */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: activeTintColor,
          tabBarInactiveTintColor: inactiveTintColor,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: [styles.tabBar, Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              overflow: 'hidden',
            },
          })],
          tabBarItemStyle: styles.tabBarItem,
        }}
         initialRouteName={userTabs[0].name} // Set initial route to first tab
      >

      {userTabs.map(({ name, title, iconName }) => (
          <Tabs.Screen
            key={name}
            name={name}
           
            options={{
              title,
              tabBarIcon: ({ color, focused }) => (
                <View style={focused ? styles.activeTabIconContainer : styles.tabIconContainer}>
                  <IconSymbol size={20} name={iconName} color={color} />
                </View>
              ),
            }}
      
          />
        ))}
     
        {/* <Tabs.Screen
          name="appointments"
          options={{
            title: 'Appointments',
            tabBarIcon: ({ color, focused }) => (
              <View style={focused ? styles.activeTabIconContainer : styles.tabIconContainer}>
                <IconSymbol size={20} name="list.fill" color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: 'About us',
            tabBarIcon: ({ color, focused }) => (
              <View style={focused ? styles.activeTabIconContainer : styles.tabIconContainer}>
                <IconSymbol size={20} name="person.fill" color={color} />
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="admin"
          options={{
            title: 'Admin',
            tabBarIcon: ({ color, focused }) => (
              <View style={focused ? styles.activeTabIconContainer : styles.tabIconContainer}>
                <IconSymbol size={20} name="admin-panel-settings.fill" color={color} />
              </View>
            ),
          }}
        /> */}
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 10,
    paddingTop: 35,
    
    zIndex: 100,
    height: 'auto',
  },
  menuButton: {
    padding: 8,
  },
  logoContainer: {
  },
  logo: {
    height: 30,
    width: 80,
  },

  tabBar: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // overflow: 'hidden',
    // elevation: 10,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: -2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,

    height: 60,
  },

  tabBarItem: {
    padding: 0,
    margin: 0,
  },

  tabIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    borderTopWidth: 3,
    borderTopColor: 'transparent', // Use your inactive tint color
    width: '100%',
  },
  activeTabIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    borderTopWidth: 3,
    width: '100%',
    borderTopColor: Colors.light.tint, // Use your active tint color
  },
});