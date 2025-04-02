import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Text, 
  Card,
  Divider,
  Button,
  Chip,
  useTheme
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TabView, TabBar } from 'react-native-tab-view';

const AdminList = () => {
  const theme = useTheme();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'accepted', title: 'Accepted' },
    { key: 'rejected', title: 'Rejected' },
  ]);
  
  // Static data - will be replaced with API data
  const [stats, setStats] = useState({
    totalUsers: 124,
    totalRequests: 18,
    totalAccepted: 12,
    totalRejected: 6,
    totalRevenue: 8400
  });

  const [bookings, setBookings] = useState({
    accepted: [
      {
        id: '1',
        date: 'June 15, 2023',
        time: '10:00 AM - 11:00 AM',
        user: 'John Doe',
        amount: '500'
      },
      {
        id: '2',
        date: 'June 15, 2023',
        time: '12:00 PM - 1:00 PM',
        user: 'Jane Smith',
        amount: '700'
      }
    ],
    rejected: [
      {
        id: '3',
        date: 'June 15, 2023',
        time: '1:00 PM - 2:00 PM',
        user: 'Robert Johnson',
        amount: '500',
        reason: 'Slot not available'
      },
      {
        id: '4',
        date: 'June 15, 2023',
        time: '3:00 PM - 4:00 PM',
        user: 'Emily Davis',
        amount: '700',
        reason: 'Payment failed'
      }
    ]
  });

  const onStartDateChange = (event, date) => {
    setShowStartDatePicker(false);
    if (date) {
      setStartDate(date);
      // Here you would call your API with the new date range
      // fetchData(date, endDate);
    }
  };

  const onEndDateChange = (event, date) => {
    setShowEndDatePicker(false);
    if (date) {
      setEndDate(date);
      // Here you would call your API with the new date range
      // fetchData(startDate, date);
    }
  };

  // This will be replaced with actual API call
  const fetchData = (start, end) => {
    console.log("Fetching data for range:", start, end);
    // Mock data update based on date range
    const daysDiff = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
    setStats({
      totalUsers: 124 + daysDiff,
      totalRequests: 18 + daysDiff,
      totalAccepted: 12 + daysDiff,
      totalRejected: 6 + daysDiff,
      totalRevenue: 8400 + (daysDiff * 100)
    });
  };

  const renderScene = ({ route }) => {
    const data = route.key === 'accepted' ? bookings.accepted : bookings.rejected;
    const statusColor = route.key === 'accepted' ? '#4CAF50' : '#F44336';
    
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {data.length > 0 ? (
          data.map(booking => (
            <BookingCard 
              key={booking.id} 
              booking={booking} 
              status={route.key}
              statusColor={statusColor}
            />
          ))
        ) : (
          <EmptyState message={`No ${route.key} bookings`} />
        )}
      </ScrollView>
    );
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: theme.colors.primary }}
      style={{ backgroundColor: theme.colors.background }}
      labelStyle={{ 
        color: 'black', // Changed to black
        fontWeight: 'bold', 
        textTransform: 'capitalize' 
      }}2
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <Text style={[styles.header, { color: theme.colors.text }]}>Admin Dashboard</Text>
        
        {/* Total Users Card (Full Width) */}
        <Card style={[styles.fullWidthCard, { backgroundColor: '#E3F2FD' }]}>
          <Card.Content style={styles.statCardContent}>
            <MaterialCommunityIcons name="account-group" size={24} color="#2196F3" />
            <View style={styles.statTextContainer}>
              <Text style={styles.statLabel}>Total Users</Text>
              <Text style={[styles.statValue, { color: '#2196F3' }]}>{stats.totalUsers}</Text>
            </View>
          </Card.Content>
        </Card>
        
        {/* Date Range Filter */}
        <View style={styles.filterContainer}>
          <View style={styles.dateRangeRow}>
            <Button 
              mode="outlined" 
              icon="calendar-arrow-right"
              onPress={() => setShowStartDatePicker(true)}
              style={[styles.dateButton, { flex: 1, marginRight: 8 }]}
              labelStyle={styles.buttonLabel}
            >
              {startDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </Button>
            
            <Text style={[styles.dateRangeTo, { color: theme.colors.text }]}>to</Text>
            
            <Button 
              mode="outlined" 
              icon="calendar-arrow-left"
              onPress={() => setShowEndDatePicker(true)}
              style={[styles.dateButton, { flex: 1, marginLeft: 8 }]}
              labelStyle={styles.buttonLabel}
            >
              {endDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </Button>
          </View>
          
          {showStartDatePicker && (
            <DateTimePicker 
              value={startDate} 
              mode="date" 
              display="default" 
              onChange={onStartDateChange} 
            />
          )}
          
          {showEndDatePicker && (
            <DateTimePicker 
              value={endDate} 
              mode="date" 
              display="default" 
              onChange={onEndDateChange}
              minimumDate={startDate}
            />
          )}
        </View>
        
        {/* Three Stats Cards (Requests, Accepted, Rejected) */}
        <View style={styles.statsRow}>
          <Card style={[styles.statsCard, { backgroundColor: '#FFF3E0' }]}>
            <Card.Content style={styles.smallStatContent}>
              <MaterialCommunityIcons name="calendar-clock" size={20} color="#FF9800" />
              <Text style={styles.statLabel}>Requests</Text>
              <Text style={[styles.smallStatValue, { color: '#FF9800' }]}>{stats.totalRequests}</Text>
            </Card.Content>
          </Card>
          
          <Card style={[styles.statsCard, { backgroundColor: '#E8F5E9' }]}>
            <Card.Content style={styles.smallStatContent}>
              <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
              <Text style={styles.statLabel}>Accepted</Text>
              <Text style={[styles.smallStatValue, { color: '#4CAF50' }]}>{stats.totalAccepted}</Text>
            </Card.Content>
          </Card>
          
          <Card style={[styles.statsCard, { backgroundColor: '#FFEBEE' }]}>
            <Card.Content style={styles.smallStatContent}>
              <MaterialCommunityIcons name="close-circle" size={20} color="#F44336" />
              <Text style={styles.statLabel}>Rejected</Text>
              <Text style={[styles.smallStatValue, { color: '#F44336' }]}>{stats.totalRejected}</Text>
            </Card.Content>
          </Card>
        </View>
        
        {/* Total Revenue Card (Full Width) */}
        <Card style={[styles.fullWidthCard, { backgroundColor: '#F3E5F5' }]}>
          <Card.Content style={styles.statCardContent}>
            <MaterialCommunityIcons name="currency-inr" size={24} color="#9C27B0" />
            <View style={styles.statTextContainer}>
              <Text style={styles.statLabel}>Total Revenue</Text>
              <Text style={[styles.statValue, { color: '#9C27B0' }]}>₹{stats.totalRevenue}</Text>
            </View>
          </Card.Content>
        </Card>
        
        {/* Tab View for Accepted/Rejected Bookings */}
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: '100%' }}
          renderTabBar={renderTabBar}
          style={styles.tabView}
          lazy
          swipeEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

const BookingCard = ({ booking, status, statusColor }) => {
  return (
    <Card style={styles.bookingCard}>
      <Card.Content>
        <View style={styles.bookingHeader}>
          <View>
            <Text style={styles.bookingDate}>{booking.date}</Text>
            <Text style={styles.bookingTime}>{booking.time}</Text>
          </View>
          <Chip 
            style={{ backgroundColor: statusColor }}
            textStyle={{ color: 'white' }}
          >
            {status}
          </Chip>
        </View>
        
        <View style={styles.bookingDetails}>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="account" size={16} color="#555" />
            <Text style={styles.detailText}>{booking.user}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="currency-inr" size={16} color="#555" />
            <Text style={styles.detailText}>{booking.amount}</Text>
          </View>
        </View>
        
        {booking.reason && (
          <View style={styles.reasonContainer}>
            <MaterialCommunityIcons name="alert-circle" size={16} color="#F44336" />
            <Text style={[styles.reasonText, { color: '#F44336' }]}>
              {booking.reason}
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const EmptyState = ({ message }) => (
  <View style={styles.emptyContainer}>
    <MaterialCommunityIcons name="calendar-remove" size={40} color="#ddd" />
    <Text style={styles.emptyText}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8
  },
  scrollContainer: {
    paddingBottom: 20
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 16,
    marginBottom: 8,
    textAlign: 'center'
  },
  fullWidthCard: {
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 8
  },
  statCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16
  },
  statTextContainer: {
    marginLeft: 16
  },
  statLabel: {
    fontSize: 14,
    color: '#555'
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4
  },
  filterContainer: {
    marginHorizontal: 8,
    marginVertical: 8
  },
  dateRangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  dateRangeTo: {
    marginHorizontal: 8,
    fontWeight: 'bold'
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#999'
  },
  buttonLabel: {
    fontSize: 14
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginVertical: 8
  },
  statsCard: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 8
  },
  smallStatContent: {
    alignItems: 'center',
    padding: 12
  },
  smallStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4
  },
  tabView: {
    marginTop: 16,
    height: 400 // Adjust based on your content
  },
  bookingCard: {
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 8
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  bookingDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  bookingTime: {
    fontSize: 14,
    color: '#666'
  },
  bookingDetails: {
    marginTop: 8
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#555'
  },
  reasonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5'
  },
  reasonText: {
    marginLeft: 8,
    fontSize: 14
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    fontWeight: '500'
  }
});

export default AdminList;