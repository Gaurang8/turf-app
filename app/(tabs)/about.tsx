import { StyleSheet, Image, Platform, View, ScrollView } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Linking, TouchableOpacity } from 'react-native';
import { Share } from 'react-native';


export default function ProfileScreen() {

  const openMap = () => {
    const mapUrl = "https://maps.app.goo.gl/NAZsfvLyeb9bVRdn8"; // Your Google Maps link
    Linking.openURL(mapUrl).catch(err => console.error("Failed to open Maps", err));
  };

  const openInstagram = () => {
    const instagramUrl = "https://www.instagram.com/shivraj_box_cricket";
    Linking.openURL(instagramUrl).catch(err => console.error("Failed to open Instagram", err));
  };
  
  const makePhoneCall = () => {
    const phoneNumber = "tel:+919173880880";  // 'tel:' prefix to make a call
    Linking.openURL(phoneNumber).catch(err => console.error("Failed to make a call", err));
  };


  const shareContent = async () => {
    try {
      const result = await Share.share({
        message: "Check out Shivraj Box Cricket! 🏏\nExperience the ultimate box cricket at our location. Get details here: https://maps.app.goo.gl/NAZsfvLyeb9bVRdn8",
        url: "https://maps.app.goo.gl/NAZsfvLyeb9bVRdn8",
        title: "Shivraj Box Cricket"
      });
  
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared via:", result.activityType);
        } else {
          console.log("Content shared successfully!");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing content:", error);
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <ThemedView >
          <ThemedText style={styles.aboutUsText}>Contact Us</ThemedText>
        </ThemedView>

        <ThemedView style={styles.profileRow}>
          <Image
            source={require('@/assets/images/site_logo.jpg')}
            style={styles.profileImage}
          />

          <ThemedView style={styles.profileInfo}>
            <ThemedText style={styles.name}>Shivraj Box Cricket</ThemedText>
            <ThemedText style={styles.designation}>
              Shivraj Farm, Ravechi Hotel, Rajkot-Jamnagar Highway, At - Sanosara, Ta - Dhrol, Dist - Jamnagar
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.aboutUsText}>
  <ThemedText style={styles.description}>
    Ultimate Box Cricket Experience!
    {'\n'}
    Enjoy seamless box cricket with us
  </ThemedText>

  {/* Feature List */}
  <ThemedView style={styles.featureRow}>
    <ThemedText style={styles.descIcon}>🏆</ThemedText>
    <ThemedText style={styles.descMainText}>Host Tournaments: Organise your matches and tournaments</ThemedText>
  </ThemedView>

  <ThemedView style={styles.featureRow}>
    <ThemedText style={styles.descIcon}>🌿</ThemedText>
    <ThemedText style={styles.descMainText}>Peaceful ambience surrounded by nature</ThemedText>
  </ThemedView>

  <ThemedView style={styles.featureRow}>
    <ThemedText style={styles.descIcon}>🛣</ThemedText>
    <ThemedText style={styles.descMainText}>Highway access</ThemedText>
  </ThemedView>

  <ThemedView style={styles.featureRow}>
    <ThemedText style={styles.descIcon}>🍔</ThemedText>
    <ThemedText style={styles.descMainText}>Great Food: Best quality and tasty food at walking distance</ThemedText>
  </ThemedView>

  <ThemedView style={styles.featureRow}>
    <ThemedText style={styles.descIcon}>🚗</ThemedText>
    <ThemedText style={styles.descMainText}>Spacious Parking</ThemedText>
  </ThemedView>
</ThemedView>

        {/* <ThemedView style={styles.shareLinkContainer}>
          <Image
            source={require('@/assets/images/instagram.png')}
            style={styles.shareLinkImage}
          />

          <ThemedView style={styles.shareLinkInfo}>
            <ThemedText style={styles.shareLink}>@shivraj_box_cricket</ThemedText>
            <ThemedText style={styles.shareLinkDescription}>
              Follow us on Instagram for more updates!
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.shareLinkContainer}>
          <Image
            source={require('@/assets/images/phone-call.png')}
            style={styles.shareLinkImage}
          />

          <ThemedView style={styles.shareLinkInfo}>
            <ThemedText style={styles.shareLink}>+91 9173880880</ThemedText>
            <ThemedText style={styles.shareLinkDescription}>
              contact us for more information!
            </ThemedText>
          </ThemedView>
        </ThemedView> */}

        <TouchableOpacity onPress={openInstagram} style={styles.shareLinkContainer}>
  <Image source={require('@/assets/images/instagram.png')} style={styles.shareLinkImage} />
  <ThemedView style={styles.shareLinkInfo}>
    <ThemedText style={styles.shareLink}>@shivraj_box_cricket</ThemedText>
    <ThemedText style={styles.shareLinkDescription}>
      Follow us on Instagram for more updates!
    </ThemedText>
  </ThemedView>
</TouchableOpacity>

{/* Phone Call Link */}
<TouchableOpacity onPress={makePhoneCall} style={styles.shareLinkContainer}>
  <Image source={require('@/assets/images/phone-call.png')} style={styles.shareLinkImage} />
  <ThemedView style={styles.shareLinkInfo}>
    <ThemedText style={styles.shareLink}>+91 9173 880880</ThemedText>
    <ThemedText style={styles.shareLinkDescription}>
      Contact us for Booking!
    </ThemedText>
  </ThemedView>
</TouchableOpacity>


        {/* horizontal line */}
        <ThemedView style={{ borderBottomWidth: 1, borderBottomColor: 'gray', marginBottom: 20 }} />

        {/* share and privacy policy */}
        <ThemedView style={styles.shareLinkContainerBtm}>
          {/* <ThemedView style={styles.shareLinkInfoBtm}>
            <Image
              source={require('@/assets/images/share_svg.png')}
              style={styles.shareLinkInfoImgBtm}
            />
            <ThemedText style={styles.shareLinkInfoText}>Share</ThemedText>
          </ThemedView> */}

          <TouchableOpacity onPress={shareContent} style={styles.shareLinkInfoBtm}>
            <Image
              source={require('@/assets/images/share_svg.png')}
              style={styles.shareLinkInfoImgBtm}
            />
            <ThemedText style={styles.shareLinkInfoText}>Share</ThemedText>
          </TouchableOpacity>

          <ThemedView style={styles.shareLinkInfoBtm}>
            <Image
              source={require('@/assets/images/insurance.png')}
              style={styles.shareLinkInfoImgBtm}
            />
            <ThemedText style={styles.shareLinkInfoText}>Privacy Policy</ThemedText>
          </ThemedView>

          <TouchableOpacity onPress={openMap} style={styles.shareLinkInfoBtm} >
            <Image
              source={require('@/assets/images/location.png')}
              style={styles.shareLinkInfoImgBtm}
            />
            <ThemedText style={styles.shareLinkInfoText}>Get Location</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* v 1.0.0 */}
        <ThemedView style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20, marginTop: 20 }}>
          <ThemedText style={{ fontSize: 14, fontWeight: '500' }}>v 1.0.0</ThemedText>
        </ThemedView>

      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,  // Allows content to be scrollable
  },
  container: {
    paddingInline: 20,
    paddingTop: 50,
    minHeight: '100%',
  },
  featureRow: {
    flexDirection: 'row',  // Arrange items in a row (icon + text)
    alignItems: 'center',  // Align items vertically in the center
    marginTop: 10,      // Add spacing between rows
  },
  descIcon: {
    fontSize: 18,          // Adjust icon size
    marginRight: 10,       // Add spacing between icon and text
  },
  descMainText: {
    fontSize: 15,          
    fontWeight: '400',
    flexShrink: 1,         // Prevents text from overflowing
  },
  aboutUsText: {
    marginBottom: 35,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
    paddingTop: 20,
    color: '#800080',
    fontFamily: 'sans-serif',
  },
  profileRow: {
    flexDirection: 'row', // Align items horizontally in one row
    alignItems: 'center',  // Vertically center the items
    gap: 15,               // Space between image and text
    marginBottom: 25,      // Add margin at the bottom for spacing
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
    fontSize: 15,
  },
  shareLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
    marginBottom: 20,
    maxWidth: '100%',
  },
  shareLinkImage: {
    width: 40,
    height: 40,
    objectFit: 'contain',
  },
  shareLinkInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexShrink: 1,
  },
  shareLink: {
    fontSize: 16,
    fontWeight: '500',
  },
  shareLinkDescription: {
    fontSize: 14,
    color: 'gray',
    wordWrap: 'break-word',
    flexShrink: 1,
    width: '100%',
  },
  shareLinkContainerBtm: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 25,
    marginBottom: 20,
    maxWidth: '100%',
    display: 'flex',
    marginTop: 15,
  },
  shareLinkInfoBtm: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 25,
  },
  shareLinkInfoImgBtm: {
    width: 22,
    height: 22,
    objectFit: 'contain',
  },
  shareLinkInfoText: {
    fontSize: 16,
    fontWeight: '400',
  },
});
