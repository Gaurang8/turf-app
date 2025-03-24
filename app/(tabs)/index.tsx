import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function FormScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);

  const handleDateConfirm = (selectedDate : any) => {
    setDate(selectedDate.toDateString());
    hideDatePicker();
  };

  const handleTimeConfirm = (selectedTime : any) => {
    setTime(selectedTime.toLocaleTimeString());
    hideTimePicker();
  };

  const handleSubmit = () => {
    if (!name || !phone || !date || !time) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }
    Alert.alert('Success', `Name: ${name}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Jatin Sher ......</Text>
      <Text style={styles.label}>Name:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter your name" />

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="Enter phone number" />

      <Text style={styles.label}>Select Date:</Text>
      <Button title={date || 'Pick a Date'} onPress={showDatePicker} />
      <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleDateConfirm} onCancel={hideDatePicker} />

      <Text style={styles.label}>Select Time:</Text>
      <Button title={time || 'Pick a Time'} onPress={showTimePicker} />
      <DateTimePickerModal isVisible={isTimePickerVisible} mode="time" onConfirm={handleTimeConfirm} onCancel={hideTimePicker} />

      <Button title="Submit" onPress={handleSubmit} color="blue" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
