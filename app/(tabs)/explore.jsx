import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ThemedView } from "@/components/ThemedView";


const AdminDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [bookingRequests, setBookingRequests] = useState([
    { id: 1, slot: "10:00 AM - 11:00 AM", price: 500, status: "pending" },
    { id: 2, slot: "12:00 PM - 1:00 PM", price: 700, status: "pending" },
    { id: 3, slot: "1:00 PM - 2:00 PM", price: 500, status: "pending" },
    { id: 4, slot: "3:00 PM - 4:00 PM", price: 700, status: "pending" },
  ]);
  const [acceptedBookings, setAcceptedBookings] = useState([]);
  const [rejectedBookings, setRejectedBookings] = useState([]);

  const totalBookings = bookingRequests.length;
  const totalRevenue = bookingRequests.reduce((sum, booking) => sum + booking.price, 0);

  const onDateChange = (event, date) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const acceptBooking = (booking) => {
    setBookingRequests(bookingRequests.filter((b) => b.id !== booking.id));
    setAcceptedBookings([...acceptedBookings, { ...booking, status: "accepted" }]);
  };

  const rejectBooking = (booking) => {
    setBookingRequests(bookingRequests.filter((b) => b.id !== booking.id));
    setRejectedBookings([...rejectedBookings, { ...booking, status: "rejected" }]);
  };

  return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
    
    <ThemedView style={styles.container}>
      <Text style={styles.header}>🏏 Admin Dashboard</Text>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Total Bookings</Text>
          <Text style={styles.statValue}>{totalBookings}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Total Revenue</Text>
          <Text style={styles.statValue}>₹{totalRevenue}</Text>
        </View>
      </View>

      {/* Date Picker */}
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(true)}>
        <Text style={styles.dateText}>📅 {selectedDate.toDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker value={selectedDate} mode="date" display="default" onChange={onDateChange} />
      )}

      {/* Booking Requests Section */}
      <Text style={styles.sectionTitle}>📌 Booking Requests</Text>
      {bookingRequests.map((item, index) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.cardText}>
            <Text style={styles.bold}>#{index + 1} </Text> {item.slot} | ₹{item.price}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.acceptButton} onPress={() => acceptBooking(item)}>
              <Text style={styles.buttonText}>✅ Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectButton} onPress={() => rejectBooking(item)}>
              <Text style={styles.buttonText}>❌ Reject</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Accepted Bookings Section */}
      <Text style={styles.sectionTitle}>✅ Accepted Bookings</Text>
      {acceptedBookings.map((item, index) => (
        <View key={item.id} style={[styles.card, styles.acceptedCard]}>
          <Text style={styles.cardText}>
            <Text style={styles.bold}>#{index + 1} </Text> {item.slot} | ₹{item.price}
          </Text>
        </View>
      ))}

      {/* Rejected Bookings Section */}
      <Text style={styles.sectionTitle}>❌ Rejected Bookings</Text>
      {rejectedBookings.map((item, index) => (
        <View key={item.id} style={[styles.card, styles.rejectedCard]}>
          <Text style={styles.cardText}>
            <Text style={styles.bold}>#{index + 1} </Text> {item.slot} | ₹{item.price}
          </Text>
        </View>
      ))}
    </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer:{
    flexGrow: 1, 

  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
    paddingBottom: 100,
    flexGrow: 1, 
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  statCard: {
    backgroundColor: "#ffcc00",
    padding: 15,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },
  statTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  dateButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#444",
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  acceptedCard: {
    backgroundColor: "#d4edda",
  },
  rejectedCard: {
    backgroundColor: "#f8d7da",
  },
  cardText: {
    fontSize: 16,
    color: "#333",
  },
  bold: {
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: "#28a745",
    padding: 8,
    borderRadius: 5,
  },
  rejectButton: {
    backgroundColor: "#dc3545",
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AdminDashboard;
