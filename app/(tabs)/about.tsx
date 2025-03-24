import { StyleSheet, Image, Platform, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}> {/* Main outer container */}
      {/* Row container for image, name, and designation */}
      <ThemedView style={styles.aboutUsText}>
        {/* Themed title */}
        <ThemedText type="title">About us</ThemedText>
      </ThemedView>

      <ThemedView style={styles.profileRow}>
        {/* Profile Picture */}
        <Image
          source={require('@/assets/images/site_logo.jpg')} 
          style={styles.profileImage}
        />

        {/* Name and Designation */}
        <ThemedView style={styles.profileInfo}>
          <ThemedText style={styles.name}>Shivraj Box Cricket</ThemedText>
          <ThemedText style={styles.designation}>
            Lorem ipsum dolor sit amcimus aliquid alias ipsum!
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.aboutUsText}>
        <ThemedText style={styles.description}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis ea id tenetur illo eos ducimus aliquid alias ipsum!
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingInline: 20,
    paddingTop: 50,
    minHeight: '100%',
  },
  aboutUsText: {
    marginBottom: 20,  
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileRow: {
    flexDirection: 'row', // Align items horizontally in one row
    alignItems: 'center',  // Vertically center the items
    gap: 15,               // Space between image and text
    marginBottom: 20,      // Add margin at the bottom for spacing
    maxWidth: '100%',      // Ensure the row does not exceed the screen width
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 40,  // Circular image
    objectFit: 'contain',  
  },
  profileInfo: {
    flexDirection: 'column', // Stack the name and designation vertically
    justifyContent: 'center', // Align text vertically centered
    alignItems: 'flex-start', // Align text to the left
    flexShrink: 1,  // Prevent the text from overflowing
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  designation: {
    fontSize: 14,
    color: 'gray',  // Add color to the designation for better contrast
    wordWrap: 'break-word',  // This is for web, but React Native handles wrapping automatically
    flexShrink: 1,  // Allow the text to shrink if needed
    width: '100%',  // Make sure the text wraps within the available width
  },
  description: {
    fontSize: 18,
  },
});
