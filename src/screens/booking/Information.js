import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Linking,
  Modal,
  FlatList,
  Button
} from 'react-native';
import styles from './Information.style';
import Swiper from 'react-native-swiper';
import * as COLORS from '../../utils/color';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment, { duration } from 'moment';
import 'moment-timezone';
import { useAppSelector } from '../../../store/hook';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Information = ({ route }) => {

  const user = useAppSelector(state => state.profile.data);
  const { data } = route.params || null;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [booking, setBooking] = useState({});
  const [documents, setDocuments] = useState({});
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  const [allBookingIds, setAllBookingIds] = useState([]);

  const generateTimeSlots = (startTime, endTime, duration) => {
    const slots = [];
    const format = 'h:mm A';
    const start = moment(startTime, 'h:mm A');
    const end = moment(endTime, 'h:mm A');
    const timeSlotDuration = moment.duration(duration, 'minutes');

    let slotStart = start.clone();
    while (slotStart.isBefore(end)) {
      const slotEnd = slotStart.clone().add(timeSlotDuration);
      if (slotEnd.isAfter(end)) {
        break;
      }

      slots.push({
        start: slotStart.format(format),
        end: slotEnd.format(format),
      });
      slotStart = slotEnd;
    }
    return slots;
  };

  const fetchAllBookingIds = async () => {
    try {
      const snapshot = await firestore()
        .collection('Booking')
        .get();

      if (!snapshot.empty) {
        const allVenueData = snapshot.docs.map((doc) => doc.data());
        const allBookingIds = [];

        allVenueData.forEach((venueData) => {
          const venueBookings = venueData.bookings || [];
          const venueIds = venueBookings.map((booking) => booking.bookingId);
          allBookingIds.push(...venueIds);
        });

        setAllBookingIds(allBookingIds);
        console.log(allBookingIds)
      } else {
        console.log('No documents found.');
      }
    } catch (error) {
      console.error('Error fetching all booking IDs:', error);
    }
  };


  const generateTime = (time, date) => {
    if (!time) {
      console.error('Invalid time:', time);
      return null;
    }

    const parsedTime = moment(time, 'h:mm A');

    if (!parsedTime.isValid()) {
      console.error('Invalid time format:', time);
      return null;
    }

    const currentDate = moment(date)
      .hours(parsedTime.hours())
      .minutes(parsedTime.minutes())
      .seconds(0);

    return firestore.Timestamp.fromDate(currentDate.toDate());
  };


  useEffect(() => {
    const start = new Date();
    start.setHours(0);
    start.setMinutes(0);
    const end = new Date();
    end.setHours(24);
    end.setMinutes(0);
    const duration = 60;
    const slots = generateTimeSlots(start, end, duration);
    setTimeSlots(slots);
  }, []);


  const generateId = async () => {
    await fetchAllBookingIds();
    allBookingIds.sort();
    const newId = parseInt(allBookingIds[allBookingIds.length - 1]) + 1;
    console.log(newId);
    return newId;
  };



  const onDayPress = (day) => {
    const date = day.dateString;
    const updatedDates = { ...selectedDates };
    if (updatedDates[date]) {
      delete updatedDates[date];
    } else {
      updatedDates[date] = { selected: true };
    }
    setSelectedDates(updatedDates);
  };


  const check = () => {
    if (data.bookings[0].bookedBy !== "") {
      Alert.alert("Its Already Booked!!");
    } else {
      Alert.alert("You may proceed!!");
    }
  };

  const startTimeHandler = () => {
    setIsStartTimeSelected(false)
    setStartTimePickerVisible(true)
  }

  const endTimeHandler = () => {
    setIsEndTimeSelected(false);
    setEndTimePickerVisible(true)
  }


  const selectedDateObjects = Object.keys(selectedDates).map((dateString) => new Date(dateString));

  const toggleItemSelection = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selected) => selected !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const bookRequest = async () => {
    try {
      const collectionRef = firestore().collection("Booking");
      const documentRef = collectionRef.doc(data.id);

      const doc = await documentRef.get();

      if (doc.exists) {
        const bookingData = doc.data();
        setDocuments(bookingData);

        const newBookings = await Promise.all(
          selectedDateObjects.map(async (date) => {
            return Promise.all(
              selectedItems.map(async (timeSlot) => {
                const formattedStartTime = `${timeSlot.start}:00`;
                const formattedEndTime = `${timeSlot.end}:00`;

                return {
                  bookedBy: user.email,
                  date: date,
                  time: {
                    startTime: await generateTime(formattedStartTime, date),
                    endTime: await generateTime(formattedEndTime, date),
                  },
                  bookedOn: new Date(),
                  bookingId: await generateId(),
                };
              })
            );
          })
        );

        const flatNewBookings = newBookings.flat();
        fetchAllBookingIds();

        const conflicts = flatNewBookings.filter((newBooking) => {
          return bookingData.bookings.some((existingBooking) => {
            const existingStartTime = existingBooking.time.startTime;
            const existingEndTime = existingBooking.time.endTime;
            const newStartTime = newBooking.time.startTime;
            const newEndTime = newBooking.time.endTime;

            return newStartTime < existingEndTime && newEndTime > existingStartTime;
          });
        });

        if (conflicts.length === 0) {
          const updatedBookings = [...bookingData.bookings, ...flatNewBookings];
          const updatedBookingData = {
            ...bookingData,
            bookings: updatedBookings,
          };

          await documentRef.set(updatedBookingData);
          Alert.alert("Booking Successful");
          setSelectedDates([]);
          setSelectedItems([]);
        } else {
          Alert.alert("Booking conflicts found. Please choose a different time slot.");
        }
      }
    } catch (error) {
      console.error('Error fetching and updating booking data from Firestore:', error);
    }
  };



  const renderItem = ({ item }) => {
    // Check if the current time slot is already booked
    const isBooked = documents && documents.bookings && documents.bookings.some((booking) => {
      const bookingStartTime = moment(booking.time.startTime.toDate());
      const bookingEndTime = moment(booking.time.endTime.toDate());

      const timeSlotStartTime = moment(item.start, 'h:mm A');
      const timeSlotEndTime = moment(item.end, 'h:mm A');

      // Check for overlapping time slots
      return (
        timeSlotStartTime.isBefore(bookingEndTime) && timeSlotEndTime.isAfter(bookingStartTime)
      );
    });

    // Parse the start time of the time slot
    const slotStartTime = moment(item.start, 'h:mm A');
    const currentTime = moment();
    const isPastTimeSlot = slotStartTime.isBefore(currentTime);

    return (
      <TouchableOpacity
        onPress={() => {
          if (!isBooked && !isPastTimeSlot) {
            toggleItemSelection(item);
          }
        }}
        style={[
          styles.timeSlot,
          {
            backgroundColor: selectedItems.includes(item) ? 'lightblue' : 'white',
            opacity: isPastTimeSlot ? 0.5 : isBooked ? 0.5 : 1,
          },
        ]}
        disabled={isBooked || isPastTimeSlot}
      >
        <Text>{item.start} - {item.end}</Text>
      </TouchableOpacity>
    );
  };




  return (
    <ScrollView style={styles.mainview}>
      <View style={styles.headingview}>
        <Text style={styles.heading}>About Venue</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.venueImage}>
            <Swiper style={styles.wrapper} loop autoplay activeDotColor={COLORS.white}>
              {data.images.map((image, index) => (
                <View key={index} style={styles.slide}>
                  <Image source={{ uri: image }} style={styles.image} />
                </View>
              ))}
            </Swiper>
          </View>
        </View>
        <View style={styles.venueDetails}>
          <Text style={styles.venueTitle}>{data.name}</Text>
          <TouchableOpacity onPress={() => { Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${data.location}`) }}>
            <Text style={styles.venueLocation}>Location: {data.institute}</Text>
          </TouchableOpacity>
          <Text style={styles.venueDescription}>{data.desc}</Text>
          <View style={styles.qtyContainer}></View>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => { setModalVisible(true) }}>
            <Text style={styles.buttonText}>BOOK</Text>
          </TouchableOpacity>

          <Modal
            visible={modalVisible}
            animationType='slide'
            transparent={false}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                  <Ionicons name={'arrow-back-circle-outline'} size={25} color={COLORS.white} />
                </TouchableOpacity>
                <View style={styles.modalHeaderTextContainer}>
                  <Text style={styles.modalHeaderText}>Booking Information</Text>
                </View>
              </View>
              <ScrollView>
                <View style={styles.inner}>
                  <Text style={styles.selectText}>Select Date</Text>
                  <Calendar
                    markedDates={selectedDates}
                    onDayPress={onDayPress}
                    minDate={minDate}
                  />
                  <Text style={styles.selectText}>Select your Time Slots</Text>
                  <FlatList
                    data={timeSlots}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                  />
                  <TouchableOpacity onPress={bookRequest} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Book</Text>
                  </TouchableOpacity>


                  <View style={{ flexDirection: 'row' }}>
                    {selectedDateObjects.length > 0 && (
                      <View style={styles.table}>
                        <View style={styles.tableHeading}>
                          <Text>Selected Dates:</Text>
                        </View>
                        {selectedDateObjects.map((date) => (
                          <Text style={styles.rows} key={date}>
                            {date.toLocaleDateString()}
                          </Text>
                        ))}
                      </View>
                    )}
                    {selectedItems.length > 0 && (
                      <View style={styles.table}>
                        <View style={styles.tableHeading}>
                          <Text>Time:</Text>
                        </View>
                        {selectedItems.map((time) => (
                          <Text style={styles.rows} key={time.start}>
                            {time.start} - {time.end}
                          </Text>
                        ))}
                      </View>
                    )}

                  </View>
                </View>
              </ScrollView>
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
}

export default Information;
