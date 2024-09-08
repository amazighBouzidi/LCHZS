import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { appointmentsDisponibilite } from '../helper/appointmentsDisponibiliteGenerate';
import AppointmentCard from '../components/AppointmentCard';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo vector icons

const AppointmentsScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [appointments, setAppointments] = useState([]);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  useEffect(() => {
    const allAppointments = appointmentsDisponibilite();
    const filteredAppointments = allAppointments.filter(appointment =>
      appointment.startDate.startsWith(selectedDate)
    );
    setAppointments(filteredAppointments);
  }, [selectedDate]);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setIsCalendarVisible(false); // Hide calendar after selecting a date
  };

  const handleRemoveAppointment = (appointment, msg) => {
    // Implement the logic to remove the appointment from the list
    console.log(msg);
  };

  const toggleCalendarVisibility = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCalendarVisible}
        onRequestClose={() => setIsCalendarVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Calendar
              current={selectedDate}
              onDayPress={handleDayPress}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: '#075eec' },
              }}
              theme={{
                backgroundColor: 'white',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: '#075eec',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
              }}
            />
          </View>
        </View>
      </Modal>
      <ScrollView style={styles.appointmentsContainer}>
        {appointments.map((appointment, index) => (
          <View key={index} style={styles.appointmentCardContainer}>
            <AppointmentCard
              data={appointment}
              onRemoveAppointment={handleRemoveAppointment}
            />
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.fab} onPress={toggleCalendarVisibility}>
        <Ionicons name="calendar" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    flex: 1,
  },
  appointmentsContainer: {
    padding: 10,
  },
  appointmentCardContainer: {
    marginTop: 10, // Adding margin top between appointment cards
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#075eec',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
});

export default AppointmentsScreen;
