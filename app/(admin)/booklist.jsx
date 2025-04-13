import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Text, 
  Card,
  Divider
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TabView, TabBar } from 'react-native-tab-view';

const CricketBookingsScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'all', title: 'All' },
    { key: 'failed', title: 'Failed/Cancelled' },
  ]);

  // Static cricket booking data with amounts
  const bookingsData = {
    all: [
      {
        id: '1',
        date: 'June 15, 2023',
        time: '3:00 PM - 5:00 PM',
        status: 'Completed',
        venue: 'City Cricket Ground',
        reason: 'Payment completed',
        amount: '1500'
      },
      {
        id: '2',
        date: 'June 10, 2023',
        time: '9:00 AM - 12:00 PM',
        status: 'Failed',
        venue: 'Community Cricket Club',
        reason: 'Payment declined',
        amount: '1200'
      },
      {
        id: '3',
        date: 'June 5, 2023',
        time: '2:00 PM - 6:00 PM',
        status: 'Pending',
        venue: 'National Cricket Academy',
        reason: 'Awaiting confirmation',
        amount: '2000'
      }
    ],
    failed: [
      {
        id: '2',
        date: 'June 10, 2023',
        time: '9:00 AM - 12:00 PM',
        status: 'Failed',
        venue: 'Community Cricket Club',
        reason: 'Payment declined',
        amount: '1200'
      },
      {
        id: '4',
        date: 'May 28, 2023',
        time: '10:00 AM - 1:00 PM',
        status: 'Cancelled',
        venue: 'Local Cricket Field',
        reason: 'Rain cancellation',
        amount: '1000'
      }
    ]
  };

  const renderScene = ({ route }) => {
    const data = route.key === 'all' ? bookingsData.all : bookingsData.failed;
    
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {data.length > 0 ? (
          data.map(booking => (
            <CricketBookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <EmptyState />
        )}
      </ScrollView>
    );
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'black' }}
      style={{ backgroundColor: 'white' }}
      labelStyle={{ color: 'black', fontWeight: 'bold', textTransform: 'capitalize' }}
      activeColor="black"
      inactiveColor="#666"
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Bookings</Text>
      <Divider style={styles.divider} />
      
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: '100%' }}
        renderTabBar={renderTabBar}
        lazy
        swipeEnabled={false}
      />
    </View>
  );
};

const CricketBookingCard = ({ booking }) => {
  const getStatusColor = () => {
    switch(booking.status) {
      case 'Completed': return '#4CAF50';
      case 'Failed': return '#F44336';
      case 'Cancelled': return '#FF9800';
      case 'Pending': return '#2196F3';
      default: return '#9E9E9E';
    }
  };

  const getReasonColor = () => {
    switch(booking.status) {
      case 'Completed': return '#4CAF50';
      case 'Pending': return '#FF9800';
      case 'Failed': return '#F44336';
      case 'Cancelled': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <View style={styles.venueContainer}>
            <MaterialCommunityIcons name="calendar" size={16} color="#555" />
            <Text style={styles.venueText}>{booking.date}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusText}>{booking.status}</Text>
          </View>
        </View>
        
        <View style={styles.matchDetails}>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="clock-outline" size={16} color="#555" />
            <Text style={styles.detailText}>{booking.time}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="currency-inr" size={16} color="#555" />
            <Text style={styles.detailText}>{booking.amount}</Text>
          </View>
        </View>
        
        <View style={styles.reasonContainer}>
          <MaterialCommunityIcons 
            name="information" 
            size={16} 
            color={getReasonColor()} 
          />
          <Text style={[styles.reasonText, { color: getReasonColor() }]}>
            {booking.reason}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <MaterialCommunityIcons name="cricket" size={40} color="#ddd" />
    <Text style={styles.emptyText}>No completed matches</Text>
    <Text style={styles.emptySubtext}>
      All completed matches will appear here
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    paddingBottom: 8,
    color: 'black'
  },
  divider: {
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#eee'
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    width: '100%',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 1,
    backgroundColor: 'white'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5'
  },
  venueContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  venueText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#333'
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  },
  matchDetails: {
    marginTop: 4
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
    fontSize: 14,
    fontWeight: '500'
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
    marginBottom: 4,
    fontWeight: '500'
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center'
  }
});

export default CricketBookingsScreen;