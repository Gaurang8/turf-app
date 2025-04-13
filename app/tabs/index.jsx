import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions, FlatList, ImageBackground } from "react-native";
import { 
  Button, 
  Text, 
  TouchableRipple, 
  Card, 
  Title, 
  Paragraph,
  Divider,
  useTheme
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSession } from '@/hooks/useSession';
import Toast from 'react-native-toast-message';


// Static data for booked slots (date + time ranges)
const bookedSlots = [
  { date: "2023-06-15", start: "10:00 AM", end: "11:00 AM" },
  { date: "2023-06-15", start: "2:30 PM", end: "3:30 PM" },
  { date: "2023-06-16", start: "9:00 AM", end: "10:00 AM" },
  { date: "2023-06-16", start: "4:00 PM", end: "5:00 PM" },
];

const generateTimeSlots = () => {
  const slots = [];
  
  // AM slots (12 AM to 11 AM)
  for (let hour = 0; hour < 12; hour++) {
    for (let minute = 0; minute < 60; minute += 60) { // 1-hour intervals
      const displayHour = hour === 0 ? 12 : hour;
      const period = 'AM';
      const startDisplay = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
      
      const endHour = hour + 1;
      const endDisplayHour = endHour === 12 ? 12 : endHour;
      const endPeriod = endHour === 12 ? 'PM' : period;
      const endDisplay = `${endDisplayHour}:00 ${endPeriod}`;
      
      slots.push({
        start: `${hour}:${minute.toString().padStart(2, '0')}`,
        end: `${endHour}:00`,
        display: `${startDisplay} - ${endDisplay}`,
        shortDisplay: startDisplay,
        period: period,
        hour: hour,
        minute: minute
      });
    }
  }
  
  // PM slots (12 PM to 11 PM)
  for (let hour = 12; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 60) { // 1-hour intervals
      const displayHour = hour === 12 ? 12 : hour - 12;
      const period = 'PM';
      const startDisplay = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
      
      const endHour = hour + 1;
      const endDisplayHour = endHour === 24 ? 12 : endHour % 12;
      const endPeriod = endHour === 24 ? 'AM' : (endHour === 12 ? 'PM' : period);
      const endDisplay = `${endDisplayHour}:00 ${endPeriod}`;
      
      slots.push({
        start: `${hour}:${minute.toString().padStart(2, '0')}`,
        end: `${endHour}:00`,
        display: `${startDisplay} - ${endDisplay}`,
        shortDisplay: startDisplay,
        period: period,
        hour: hour,
        minute: minute
      });
    }
  }
  
  return slots;
};

const timeSlots = generateTimeSlots();
const { width } = Dimensions.get('window');

const BookSlot = () => {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [isSelectingEnd, setIsSelectingEnd] = useState(false);
  const [activeTab, setActiveTab] = useState('morning');

  const dateString = selectedDate.toISOString().split('T')[0];

  const { session  } = useSession();

  // Split time slots into AM and PM
  const amSlots = timeSlots.filter(slot => slot.period === 'AM');
  const pmSlots = timeSlots.filter(slot => slot.period === 'PM');

  const onDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      setSelectedStartTime(null);
      setSelectedEndTime(null);
    }
  };

  // const handleConfirmAppointment = () => {
  //   const slotObject = {
  //     slot_date: dateString,
  //     slot_range_time: `${formatTimeDisplay(selectedStartTime)} - ${formatTimeDisplay(selectedEndTime)}`,
  //     approx_amount: 1000,
  //   };
  
  //   alert(JSON.stringify(slotObject, null, 2));   
  // };
  const handleConfirmAppointment = async () => {
    const slotObject = {
      slot_date: dateString,
      slot_range_time: `${formatTimeDisplay(selectedStartTime)} - ${formatTimeDisplay(selectedEndTime)}`,
      approx_amount: 1000,
    };
  
    try {
      console.log('Confirming appointment...', slotObject);
      console.log(session)
  
      const token = await session.token; // assuming you have `session` in scope
  
      const response = await fetch('http://localhost:5000/api/v1/user/appointment-confirmation', {
        method: 'POST', // or 'PATCH' if required
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(slotObject),
      });
  
      if (!response.ok) {
        throw new Error('Failed to confirm appointment');
      }
  
      const data = await response.json();
      console.log('Appointment confirmed:', data);
  
      Toast.show({
        type: 'success',
        text1: 'Appointment Confirmed',
        text2: 'Your slot has been successfully booked.',
      });
  
    } catch (error) {
      console.error('Error confirming appointment:', error);
      Toast.show({
        type: 'error',
        text1: 'Confirmation Failed',
        text2: error.message || 'Please try again.',
      });
    }
  };
  
  

  const onTimeSelect = (time) => {
    if (!isSelectingEnd) {
      setSelectedStartTime(time);
      setIsSelectingEnd(true);
    } else {
      const start = new Date(`2000-01-01T${selectedStartTime}`);
      const end = new Date(`2000-01-01T${time}`);
      
      if (end - start >= 3600000) {
        setSelectedEndTime(time);
      } else {
        setSelectedStartTime(time);
        setSelectedEndTime(null);
      }
      setIsSelectingEnd(false);
    }
    setShowTimePicker(false);
  };

  const formatTimeDisplay = (time) => {
    if (!time) return "Not selected";
    const [hours, minutes] = time.split(':');
    const hourNum = parseInt(hours);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  };

  const isSlotBooked = (start, end) => {
    const startDisplay = formatTimeDisplay(start);
    const endDisplay = formatTimeDisplay(end);
    
    return bookedSlots.some(slot => 
      slot.date === dateString &&
      ((slot.start <= startDisplay && slot.end > startDisplay) ||
       (slot.start < endDisplay && slot.end >= endDisplay) ||
       (slot.start >= startDisplay && slot.end <= endDisplay))
    );
  };

  const isSelectionValid = selectedDate && selectedStartTime && selectedEndTime;

  const renderTimeSlot = ({ item }) => {
    const isBooked = isSlotBooked(item.start, item.end);
    const isSelected = selectedStartTime === item.start && selectedEndTime === item.end;
    
    return (
      <TouchableRipple
        onPress={() => {
          if (!isBooked) {
            setSelectedStartTime(item.start);
            setSelectedEndTime(item.end);
          }
        }}
        style={[
          styles.slot,
          isBooked && styles.bookedSlot,
          isSelected && !isBooked && styles.selectedSlot,
          !isBooked && !isSelected && styles.availableSlot,
        ]}
        disabled={isBooked}
      >
        <View style={styles.slotContent}>
          <Text style={styles.slotTime}>{item.shortDisplay}</Text>
          {isBooked && <Text style={styles.bookedText}>Booked</Text>}
          {isSelected && !isBooked && (
            <MaterialCommunityIcons 
              name="check-circle" 
              size={20} 
              color={theme.colors.primary} 
              style={styles.selectedIcon}
            />
          )}
        </View>
      </TouchableRipple>
    );
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
              Book an Appointment
            </Title>
            <Paragraph style={styles.subtitle}>
              Select a date and time for your appointment
            </Paragraph>
            
            <Divider style={styles.divider} />
            
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
                onPress={() => setShowDatePicker(true)}
                style={styles.dateButton}
                labelStyle={styles.buttonLabel}
                icon="calendar"
              >
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Button>
            </View>

            {showDatePicker && (
              <DateTimePicker 
                value={selectedDate} 
                mode="date" 
                display="default" 
                onChange={onDateChange} 
                minimumDate={new Date()}
              />
            )}
            
            <Divider style={styles.divider} />
            
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons 
                  name="clock-outline" 
                  size={24} 
                  color={theme.colors.primary} 
                />
                <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                  Select Time Slot
                </Text>
              </View>
              
              <View style={styles.timeSelection}>
                <Button 
                  mode="outlined" 
                  onPress={() => {
                    setIsSelectingEnd(false);
                    setShowTimePicker(true);
                  }}
                  style={styles.timeButton}
                  labelStyle={styles.buttonLabel}
                  icon="clock-start"
                >
                  {formatTimeDisplay(selectedStartTime)}
                </Button>
                
                <Text style={styles.timeSeparator}>to</Text>
                
                <Button 
                  mode="outlined" 
                  onPress={() => {
                    if (selectedStartTime) {
                      setIsSelectingEnd(true);
                      setShowTimePicker(true);
                    }
                  }}
                  style={styles.timeButton}
                  labelStyle={styles.buttonLabel}
                  icon="clock-end"
                  disabled={!selectedStartTime}
                >
                  {formatTimeDisplay(selectedEndTime)}
                </Button>
              </View>
              
              {showTimePicker && (
                <DateTimePicker 
                  value={new Date(`2000-01-01T${selectedStartTime || '00:00'}`)}
                  mode="time" 
                  display="spinner" 
                  onChange={(event, date) => {
                    setShowTimePicker(false);
                    if (date) {
                      const hours = date.getHours().toString().padStart(2, '0');
                      const minutes = date.getMinutes().toString().padStart(2, '0');
                      onTimeSelect(`${hours}:${minutes}`);
                    }
                  }} 
                />
              )}
              
              {selectedStartTime && selectedEndTime && isSlotBooked(selectedStartTime, selectedEndTime) && (
                <Text style={[styles.errorText, { color: theme.colors.error }]}>
                  This time slot is already booked. Please select another time.
                </Text>
              )}
            </View>
            
            <Divider style={styles.divider} />
            
            <View style={styles.availableSlots}>
  {/* Twilight Header */}
  {/* <Text style={[styles.twilightHeader, { color: theme.colors.primary }]}>
    Twilight
  </Text> */}
  
  {/* Time Period Tabs */}
  <View style={styles.timePeriodTabs}>
    <TouchableRipple 
      style={[styles.timePeriodTab, activeTab === 'morning' && styles.activeTimePeriodTab]}
      onPress={() => setActiveTab('morning')}
    >
      <Text style={[styles.timePeriodText, activeTab === 'morning' && { color: theme.colors.primary }]}>
        Morning
      </Text>
    </TouchableRipple>
    
    <TouchableRipple 
      style={[styles.timePeriodTab, activeTab === 'noon' && styles.activeTimePeriodTab]}
      onPress={() => setActiveTab('noon')}
    >
      <Text style={[styles.timePeriodText, activeTab === 'noon' && { color: theme.colors.primary }]}>
        Noon
      </Text>
    </TouchableRipple>
    
    <TouchableRipple 
      style={[styles.timePeriodTab, activeTab === 'evening' && styles.activeTimePeriodTab]}
      onPress={() => setActiveTab('evening')}
    >
      <Text style={[styles.timePeriodText, activeTab === 'evening' && { color: theme.colors.primary }]}>
        Evening
      </Text>
    </TouchableRipple>
  </View>

  {/* Time Slots - Horizontal Scroll */}
  <View style={styles.timeSlotsContainer}>
    {activeTab === 'morning' && (
      <FlatList
        data={amSlots}
        renderItem={renderTimeSlot}
        keyExtractor={(item) => `${item.hour}-${item.minute}-am`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.timeSlotList}
      />
    )}
    
    {activeTab === 'noon' && (
      <FlatList
        data={pmSlots.filter(slot => ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'].includes(slot.shortDisplay))}
        renderItem={renderTimeSlot}
        keyExtractor={(item) => `${item.hour}-${item.minute}-noon`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.timeSlotList}
      />
    )}
    
    {activeTab === 'evening' && (
      <FlatList
        data={pmSlots.filter(slot => ['4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'].includes(slot.shortDisplay))}
        renderItem={renderTimeSlot}
        keyExtractor={(item) => `${item.hour}-${item.minute}-evening`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.timeSlotList}
      />
    )}
  </View>
</View>
          </Card.Content>
          
          <Card.Actions style={styles.actions}>
            <Button 
              mode="contained" 
              disabled={!isSelectionValid || isSlotBooked(selectedStartTime, selectedEndTime)}
              onPress={handleConfirmAppointment}
              style={styles.bookButton}
              labelStyle={styles.buttonLabel}
              icon="calendar-check"
            >
              Confirm Appointment
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    color: '#666',
  },
  divider: {
    marginVertical: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  dateButton: {
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  timeSelection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
  },
  timeSeparator: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  buttonLabel: {
    fontSize: 16,
  },
  availableSlots: {
    marginTop: 8,
  },
  timeSlotSection: {
    marginBottom: 16,
  },
  timeSlotHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 8,
  },
  // timeSlotList: {
  //   paddingHorizontal: 8,
  //   paddingBlock:4,
  //   height:"auto"
  // },
  slot: {
    width: 100,
    // height: 80,
    borderRadius: 8,
    marginRight: 12,
    padding: 12,
    justifyContent: 'center',
  },
  slotContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotTime: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bookedText: {
    fontSize: 12,
    color: '#D32F2F',
    marginTop: 4,
    textAlign: 'center',
  },
  selectedIcon: {
    marginTop: 4,
  },
  availableSlot: {
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  bookedSlot: {
    backgroundColor: '#FFEBEE',
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  selectedSlot: {
    backgroundColor: '#E3F2FD',
    borderWidth: 2,
    borderColor: '#64B5F6',
  },
  actions: {
    justifyContent: 'center',
    padding: 16,
  },
  bookButton: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: 8,
  },
  errorText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 14,
  },
  // twilightHeader: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   marginBottom: 16,
  //   textAlign: 'center',
  // },
  timePeriodTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 4,
  },
  timePeriodTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 6,
  },
  activeTimePeriodTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  timePeriodText: {
    fontSize: 16,
    fontWeight: '600',
  },
  timeSlotsContainer: {
    marginTop: 8,
  },
});

export default BookSlot;