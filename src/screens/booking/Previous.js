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

  const getUserData = async () => {
    try {
      const snapshot = await firestore()
        .collection('Booking')
        .where('bookedBy', '==', user.email)
        .get();

      const fetchedDocuments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDocuments(fetchedDocuments);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

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
    <ScrollView style={{ margin: 1 }}>
      {documents.map((booking) => (
        <View key={booking.id}>
          {booking.bookings.map((individual) => (
            <View key={individual.id} style={styles.card}>
              <LinearGradient
                colors={['#BCE7FC', '#D7B8F3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ ...styles.gradient }}
              >
                <View>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>Booked By: </Text>
                    <Text style={styles.record}> {individual.bookedBy}</Text>
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
