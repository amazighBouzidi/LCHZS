import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import doctorAppointment from '../assets/doctorappointment.png'

export default function AppointmentCard({ data }) {

  return (
    <View style={styles.card}>
      <Image
        source={doctorAppointment}
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <Text style={styles.title}>Rendez-vous avec docteur Zeghaouti</Text>
        <Text style={styles.description}>
          Le {data.startDate.split("T")[0]} de {data.startDate.split("T")[1].split("+")[0]} jusqu'à {data.endDate.split("T")[1].split("+")[0]}
        </Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#075eec',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },
  image: {
    width: 80,
    height: 80,
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 13,
    color: '#6c757d',
    marginBottom: 5,
  },
  addButton: {
    alignSelf: 'flex-end',
  },
  addButtonText: {
    fontSize: 24,
    color: 'blue',
  },
});
