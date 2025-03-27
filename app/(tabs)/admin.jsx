import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

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
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🏏 Admin Dashboard</Text>

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

      <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(true)}>
        <Text style={styles.dateText}>📅 {selectedDate.toDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker value={selectedDate} mode="date" display="default" onChange={onDateChange} />
      )}

      <Text style={styles.sectionTitle}>📌 Booking Requests</Text>
      <FlatList
        data={bookingRequests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
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
        )}
      />

      <Text style={styles.sectionTitle}>✅ Accepted Bookings</Text>
      <FlatList
        data={acceptedBookings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={[styles.card, styles.acceptedCard]}>
            <Text style={styles.cardText}>
              <Text style={styles.bold}>#{index + 1} </Text> {item.slot} | ₹{item.price}
            </Text>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>❌ Rejected Bookings</Text>
      <FlatList
        data={rejectedBookings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={[styles.card, styles.rejectedCard]}>
            <Text style={styles.cardText}>
              <Text style={styles.bold}>#{index + 1} </Text> {item.slot} | ₹{item.price}
            </Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
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
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AdminDashboard;
