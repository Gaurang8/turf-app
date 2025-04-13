import React from 'react';
import { View, StyleSheet, Linking, ScrollView } from 'react-native';
import { 
  Card, 
  Title, 
  Text, 
  Divider,
  Button,
  useTheme,
  Chip
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ConfirmSlot = () => {
  const theme = useTheme();
  
  // Static data for the booking
  const bookingDetails = {
    date: "June 15, 2023",
    time: "3:00 PM - 4:00 PM",
    price: "₹1000",
    status: "Pending",
    instructions: [
      "Arrive 10 minutes before your appointment",
      "Bring your ID proof for verification",
      "Cancel at least 24 hours in advance for full refund",
      "No-shows will be charged 50% of the booking fee",
      "Contact owner if you're running late"
    ]
  };

  const openWhatsApp = () => {
    const phoneNumber = "+918000304304"; // Replace with actual number
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Card style={styles.card}>
          <Card.Content>
            <Title style={[styles.title, { color: theme.colors.primary }]}>
              Booking Confirmation
            </Title>
            
            {/* Booking Summary Section */}
            <View style={styles.section}>
              <View style={styles.summaryRow}>
                <MaterialCommunityIcons 
                  name="calendar" 
                  size={20} 
                  color={theme.colors.primary} 
                />
                <Text style={styles.summaryText}>{bookingDetails.date}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <MaterialCommunityIcons 
                  name="clock-outline" 
                  size={20} 
                  color={theme.colors.primary} 
                />
                <Text style={styles.summaryText}>{bookingDetails.time}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <MaterialCommunityIcons 
                  name="currency-inr" 
                  size={20} 
                  color={theme.colors.primary} 
                />
                <Text style={styles.summaryText}>{bookingDetails.price}</Text>
              </View>
            </View>
            
            <Divider style={styles.divider} />
            
            {/* Status Section */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                Booking Status
              </Text>
              <View style={styles.statusContainer}>
                <Chip 
                  icon="clock"
                  mode="outlined"
                  textStyle={styles.statusText}
                  style={[
                    styles.statusChip,
                    { borderColor: theme.colors.primary }
                  ]}
                >
                  {bookingDetails.status}
                </Chip>
                <Text style={styles.statusSubtext}>
                  Your booking is awaiting confirmation
                </Text>
              </View>
            </View>
            
            <Divider style={styles.divider} />
            
            {/* Instructions Section */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                Important Instructions
              </Text>
              <View style={styles.instructionsContainer}>
                {bookingDetails.instructions.map((item, index) => (
                  <View key={index} style={styles.instructionItem}>
                    <Text style={styles.bullet}>{index + 1}.</Text>
                    <Text style={styles.instructionText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <Divider style={styles.divider} />
            
            {/* Contact Section */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                Need Help?
              </Text>
              <Button 
                mode="contained" 
                onPress={openWhatsApp}
                style={styles.whatsappButton}
                labelStyle={styles.buttonLabel}
                icon="whatsapp"
              >
                Contact Owner via WhatsApp
              </Button>
            </View>
          </Card.Content>
          
          {/* Actions */}
          <Card.Actions style={styles.actions}>
            <Button 
              mode="outlined" 
              onPress={() => {}}
              style={styles.secondaryButton}
              labelStyle={styles.buttonLabel}
            >
              Modify Booking
            </Button>
            <Button 
              mode="contained" 
              onPress={() => {}}
              style={styles.primaryButton}
              labelStyle={styles.buttonLabel}
            >
              Save to Calendar
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    borderRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 16,
    marginLeft: 8,
  },
  divider: {
    marginVertical: 16,
  },
  statusContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  statusChip: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  statusSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  instructionsContainer: {
    marginLeft: 8,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
  },
  whatsappButton: {
    marginTop: 8,
    backgroundColor: '#25D366',
  },
  actions: {
    justifyContent: 'space-between',
    padding: 16,
  },
  primaryButton: {
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  secondaryButton: {
    borderRadius: 8,
    flex: 1,
  },
  buttonLabel: {
    fontSize: 15,
  },
});

export default ConfirmSlot;