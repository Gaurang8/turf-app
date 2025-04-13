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

export const unstable_settings = {
  initialRouteName: 'index',
  // 👇 this disables automatic tab screen detection
  skipInitialRender: true,
};


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
      name: 'appointments',
      title: 'Appointments',
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

  const adminTabs = [
    {
      name: 'admin/index',
      title: 'Dashboard',
      iconName: 'tablet-dashboard',
    },
    {
      name: 'admin/booklist',
      title: 'Booking List',
      iconName: 'list.alt.fill',
    },
    {
      name: 'admin/admin_list',
      title: 'Admin List',
      iconName: 'person.crop.circle.fill',
    },
    {
      name: 'admin/confirm',
      title: 'Confirm',
      iconName: 'checkmark.seal.fill',
    },
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
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <View style={focused ? styles.activeTabIconContainer : styles.tabIconContainer}>
                <IconSymbol size={20} name="house.fill" color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
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