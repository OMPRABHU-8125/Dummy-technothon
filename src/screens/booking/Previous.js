import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import styles from './previous.styles';
import firestore from '@react-native-firebase/firestore';
import { useAppSelector } from '../../../store/hook';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/MaterialIcons';

const Previous = ({ route }) => {
  const [documents, setDocuments] = useState([]);
  const user = useAppSelector((state) => state.profile.data);
  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        console.log('Fetching user bookings for:', user.email);
        const fetchedUserBookings = [];

        const snapshot = await firestore().collection('Booking').get();

        if (snapshot.empty) {
          console.log('No documents found.');
          return;
        }

        snapshot.forEach(doc => {
          const bookingData = doc.data();
          const filteredBookings = bookingData.bookings.filter(
            booking => booking.bookedBy === user.email,
          );

          if (filteredBookings.length > 0) {
            fetchedUserBookings.push({
              id: doc.id,
              ...bookingData,
              bookings: filteredBookings,
            });
          }
        });

        console.log('Fetched user bookings:', fetchedUserBookings);
        setDocuments(fetchedUserBookings)
      } catch (error) {
        console.error('Error fetching user bookings:', error);
      }
    };

    fetchUserBookings();
  }, [user.email]);


  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };

  return (
    // <View><Text>HIIII</Text></View>
    <ScrollView style={{ margin: 1 }}>
      {documents.map((booking) => (
        <View key={booking.id}>
          {booking.bookings.map((individual) => (
            <View key={individual.id} style={styles.card}>
              <LinearGradient
                colors={['#EFBF38', '#F5DE7A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ ...styles.gradient }}
              >
                <View>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>Booked By: </Text>
                    <Text style={styles.record}>{user.firstName} {user.lastName}</Text>
                    <TouchableOpacity style={styles.icon}>
                      <Icons name='delete' size={25} color='black' />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>Venue: </Text>
                    <Text style={styles.record}>{booking.name}</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>Date: </Text>
                    <Text style={styles.record}>
                      {individual.date
                        .toDate()
                        .toLocaleString('en-US', dateOptions)}
                    </Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>Time: </Text>
                    <Text style={[styles.record, { color: '#228B22' }]}>
                      {individual.time.startTime
                        .toDate()
                        .toLocaleString('en-US', timeOptions)}-{' '}
                      {individual.time.endTime
                        .toDate()
                        .toLocaleString('en-US', timeOptions)}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default Previous;
