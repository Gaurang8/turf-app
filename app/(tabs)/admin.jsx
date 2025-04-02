import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Card,
  Title,
  Text,
  Button,
  Divider,
  Chip,
  Portal,
  Dialog,
  Paragraph,
  useTheme,
  Snackbar,
  TouchableRipple,
  Provider as PaperProvider
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AdminDashboard = () => {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  
  const [bookingRequests, setBookingRequests] = useState([
    { id: 1, slot: "10:00 AM - 11:00 AM", price: 500, status: "pending", user: "John Doe" },
    { id: 2, slot: "12:00 PM - 1:00 PM", price: 700, status: "pending", user: "Jane Smith" },
    { id: 3, slot: "1:00 PM - 2:00 PM", price: 500, status: "pending", user: "Robert Johnson" },
    { id: 4, slot: "3:00 PM - 4:00 PM", price: 700, status: "pending", user: "Emily Davis" },
  ]);
  
  const [acceptedBookings, setAcceptedBookings] = useState([]);
  const [rejectedBookings, setRejectedBookings] = useState([]);

  // Calculate stats
  const totalRequests = bookingRequests.length;
  const totalAccepted = acceptedBookings.length;
  const totalRejected = rejectedBookings.length;
  const dailyRevenue = acceptedBookings.reduce((sum, booking) => sum + booking.price, 0);

  const onDateChange = (event, date) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const showConfirmationDialog = (booking, action) => {
    setSelectedBooking({...booking, action});
    setShowDialog(true);
  };

  const handleBookingAction = () => {
    const { id, action } = selectedBooking;
    const booking = bookingRequests.find(b => b.id === id);
    
    setBookingRequests(bookingRequests.filter((b) => b.id !== id));
    
    if (action === "accept") {
      setAcceptedBookings([...acceptedBookings, { ...booking, status: "accepted" }]);
      setSnackbarMessage("Booking accepted successfully");
    } else {
      setRejectedBookings([...rejectedBookings, { ...booking, status: "rejected" }]);
      setSnackbarMessage("Booking rejected");
    }
    
    setSnackbarVisible(true);
    setShowDialog(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted": return "#4CAF50";
      case "rejected": return "#F44336";
      default: return "#2196F3";
    }
  };

  return (
    <PaperProvider>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Card style={styles.card}>
            <Card.Content>
              <Title style={[styles.header, { color: theme.colors.primary }]}>
                Admin Dashboard
              </Title>
              
              <Divider style={styles.divider} />

              {/* Date Picker */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <MaterialCommunityIcons 
                    name="calendar" 
                    size={24} 
                    color={theme.colors.primary} 
                  />
                  <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                    Select Date
                  </Text>
                </View>
                
                <Button 
                  mode="outlined" 
                  icon="calendar"
                  onPress={() => setShowPicker(true)}
                  style={styles.dateButton}
                  labelStyle={styles.buttonLabel}
                >
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </Button>
                
                {showPicker && (
                  <DateTimePicker 
                    value={selectedDate} 
                    mode="date" 
                    display="default" 
                    onChange={onDateChange} 
                  />
                )}
              </View>
              
              <Divider style={styles.divider} />
              
              {/* Stats Section */}
              <View style={styles.statsContainer}>
                <View style={styles.statRow}>
                  <View style={styles.statItem}>
                    <MaterialCommunityIcons 
                      name="calendar-clock" 
                      size={20} 
                      color="#2196F3" 
                    />
                    <Text style={styles.statLabel}>Requests</Text>
                    <Text style={[styles.statValue, { color: "#2196F3" }]}>
                      {totalRequests}
                    </Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <MaterialCommunityIcons 
                      name="check-circle" 
                      size={20} 
                      color="#4CAF50" 
                    />
                    <Text style={styles.statLabel}>Accepted</Text>
                    <Text style={[styles.statValue, { color: "#4CAF50" }]}>
                      {totalAccepted}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.statRow}>
                  <View style={styles.statItem}>
                    <MaterialCommunityIcons 
                      name="close-circle" 
                      size={20} 
                      color="#F44336" 
                    />
                    <Text style={styles.statLabel}>Rejected</Text>
                    <Text style={[styles.statValue, { color: "#F44336" }]}>
                      {totalRejected}
                    </Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <MaterialCommunityIcons 
                      name="currency-inr" 
                      size={20} 
                      color="#FF9800" 
                    />
                    <Text style={styles.statLabel}>Revenue</Text>
                    <Text style={[styles.statValue, { color: "#FF9800" }]}>
                      ₹{dailyRevenue}
                    </Text>
                  </View>
                </View>
              </View>
              
              <Divider style={styles.divider} />
              
              
              {/* Booking Requests Section */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <MaterialCommunityIcons 
                    name="clock-alert-outline" 
                    size={24} 
                    color={theme.colors.primary} 
                  />
                  <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                    Booking Requests ({bookingRequests.length})
                  </Text>
                </View>
                
                {bookingRequests.length > 0 ? (
                  bookingRequests.map((item) => (
                    <TouchableRipple 
                      key={item.id} 
                      style={[styles.bookingCard, { 
                        borderColor: "#BBDEFB",
                        backgroundColor: "white" 
                      }]}
                      onPress={() => {}}
                    >
                      <View style={styles.bookingContent}>
                        <View style={styles.bookingInfo}>
                          <Text style={[styles.bookingTime, { color: "#212121" }]}>
                            {item.slot}
                          </Text>
                          <Text style={[styles.bookingUser, { color: "#616161" }]}>
                            {item.user}
                          </Text>
                          <Text style={[styles.bookingPrice, { color: "#2196F3" }]}>
                            ₹{item.price}
                          </Text>
                        </View>
                        <View style={styles.bookingActions}>
                          <Button 
                            compact 
                            mode="contained" 
                            style={[styles.actionButton, { backgroundColor: "#4CAF50" }]}
                            onPress={() => showConfirmationDialog(item, "accept")}
                          >
                            Accept
                          </Button>
                          <Button 
                            compact 
                            mode="outlined" 
                            style={[styles.actionButton, { 
                              marginLeft: 8,
                              borderColor: "#F44336" 
                            }]}
                            textColor="#F44336"
                            onPress={() => showConfirmationDialog(item, "reject")}
                          >
                            Reject
                          </Button>
                        </View>
                      </View>
                    </TouchableRipple>
                  ))
                ) : (
                  <Text style={[styles.emptyText, { color: "#9E9E9E" }]}>
                    No pending booking requests
                  </Text>
                )}
              </View>
              
              <Divider style={styles.divider} />
              
              {/* Accepted Bookings Section */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <MaterialCommunityIcons 
                    name="check-circle-outline" 
                    size={24} 
                    color="#4CAF50" 
                  />
                  <Text style={[styles.sectionTitle, { color: "#4CAF50" }]}>
                    Accepted Bookings ({acceptedBookings.length})
                  </Text>
                </View>
                
                {acceptedBookings.length > 0 ? (
                  acceptedBookings.map((item) => (
                    <TouchableRipple 
                      key={item.id} 
                      style={[styles.bookingCard, { 
                        borderColor: "#C8E6C9",
                        backgroundColor: "white" 
                      }]}
                      onPress={() => {}}
                    >
                      <View style={styles.bookingContent}>
                        <View style={styles.bookingInfo}>
                          <Text style={[styles.bookingTime, { color: "#212121" }]}>
                            {item.slot}
                          </Text>
                          <Text style={[styles.bookingUser, { color: "#616161" }]}>
                            {item.user}
                          </Text>
                          <Text style={[styles.bookingPrice, { color: "#2196F3" }]}>
                            ₹{item.price}
                          </Text>
                        </View>
                        <Chip 
                          icon="check" 
                          style={{ backgroundColor: "#4CAF50" }}
                          textStyle={{ color: "white" }}
                        >
                          Accepted
                        </Chip>
                      </View>
                    </TouchableRipple>
                  ))
                ) : (
                  <Text style={[styles.emptyText, { color: "#9E9E9E" }]}>
                    No accepted bookings
                  </Text>
                )}
              </View>
              
              <Divider style={styles.divider} />
              
              {/* Rejected Bookings Section */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <MaterialCommunityIcons 
                    name="close-circle-outline" 
                    size={24} 
                    color="#F44336" 
                  />
                  <Text style={[styles.sectionTitle, { color: "#F44336" }]}>
                    Rejected Bookings ({rejectedBookings.length})
                  </Text>
                </View>
                
                {rejectedBookings.length > 0 ? (
                  rejectedBookings.map((item) => (
                    <TouchableRipple 
                      key={item.id} 
                      style={[styles.bookingCard, { 
                        borderColor: "#FFCDD2",
                        backgroundColor: "white" 
                      }]}
                      onPress={() => {}}
                    >
                      <View style={styles.bookingContent}>
                        <View style={styles.bookingInfo}>
                          <Text style={[styles.bookingTime, { color: "#212121" }]}>
                            {item.slot}
                          </Text>
                          <Text style={[styles.bookingUser, { color: "#616161" }]}>
                            {item.user}
                          </Text>
                          <Text style={[styles.bookingPrice, { color: "#2196F3" }]}>
                            ₹{item.price}
                          </Text>
                        </View>
                        <Chip 
                          icon="close" 
                          style={{ backgroundColor: "#F44336" }}
                          textStyle={{ color: "white" }}
                        >
                          Rejected
                        </Chip>
                      </View>
                    </TouchableRipple>
                  ))
                ) : (
                  <Text style={[styles.emptyText, { color: "#9E9E9E" }]}>
                    No rejected bookings
                  </Text>
                )}
              </View>
            </Card.Content>
          </Card>
        </ScrollView>

        {/* Confirmation Dialog */}
        <Portal>
          <Dialog 
            visible={showDialog} 
            onDismiss={() => setShowDialog(false)}
            style={styles.dialog}
          >
            <Dialog.Title>Confirm Action</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                Are you sure you want to {selectedBooking?.action} this booking?
              </Paragraph>
              {selectedBooking && (
                <Card style={styles.dialogCard}>
                  <Card.Content>
                    <Text style={[styles.bold, { color: "#212121" }]}>
                      {selectedBooking.slot}
                    </Text>
                    <Text style={{ color: "#616161" }}>
                      User: {selectedBooking.user}
                    </Text>
                    <Text style={{ color: "#616161" }}>
                      Price: ₹{selectedBooking.price}
                    </Text>
                  </Card.Content>
                </Card>
              )}
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setShowDialog(false)}>Cancel</Button>
              <Button 
                mode="contained" 
                onPress={handleBookingAction}
              >
                Confirm
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        {/* Snackbar */}
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={{ backgroundColor: "#f5f5f5" }}
          action={{
            label: 'OK',
            onPress: () => setSnackbarVisible(false),
          }}
        >
          <Text style={{ color: "#212121" }}>{snackbarMessage}</Text>
        </Snackbar>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  scrollContainer: {
    paddingBottom: 16,
  },
  card: {
    borderRadius: 12,
    margin: 8,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  divider: {
    marginVertical: 12,
  },
  statsContainer: {
    marginBottom: 8,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 4,
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  section: {
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  dateButton: {
    marginTop: 4,
  },
  buttonLabel: {
    fontSize: 14,
  },
  bookingCard: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    marginBottom: 8,
  },
  bookingContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingInfo: {
    flex: 1,
  },
  bookingTime: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  bookingUser: {
    fontSize: 13,
    marginVertical: 2,
  },
  bookingPrice: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  bookingActions: {
    flexDirection: 'row',
  },
  actionButton: {
    minWidth: 80,
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 12,
    fontStyle: 'italic',
  },
  dialog: {
    borderRadius: 12,
  },
  dialogCard: {
    marginTop: 12,
    borderRadius: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default AdminDashboard;