import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import firebase from '@react-native-firebase/app';
//import styles from './HolidayCalendar.Styles'

const HolidayCalendar= () => {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const snapshot = await firebase.firestore().collection('Holidays').get();
        const holidayData = snapshot.docs.map(doc => doc.data());
        const sortedHolidays = holidayData.sort((a, b) => Date.parse(a.id) - Date.parse(b.id));
        setHolidays(sortedHolidays);
      } catch (error) {
        console.log('Error fetching holidays: ', error);
      }
    };

    fetchHolidays();
  }, []);

  const renderHolidayItem = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.column}>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.holiday}>{item.holiday}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.header1}>Date</Text>
        <Text style={styles.header2}>Holiday</Text>
      </View>
      <FlatList
        data={holidays}
        keyExtractor={item => item.id}
        renderItem={renderHolidayItem}
      />
    </View>
  );
};
const styles = StyleSheet.create({
    
  header1:
{
  paddingVertical: 10,
paddingHorizontal: 33,
  borderWidth: 1,
  color: 'black', 
  fontWeight: 'bold', 
   margin:20,
   width:120,
   height:60,
   alignItems:'center',
   justifyContent:'center',
   margin:30,
   backgroundColor:'#4bf542',
   fontSize:30
},

header2:
{
  padding: 15, 
  borderWidth: 1,
  color: 'black', 
  fontWeight: 'bold', 
   margin:5,
   width:130,
   height:60,
   alignItems:'center',
   justifyContent:'center',
   margin:30,
   backgroundColor:'#4bf542',
   fontSize:27

},
container: {
flex: 3,
padding: 10,
backgroundColor: '#a82c2c',

},
row: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
paddingVertical: 5,
paddingHorizontal: 10,
borderBottomWidth: 1,
borderBottomColor: '#ccc',
},

date:
{
  padding: 10, 
  borderWidth: 1,
  color: 'black', 
  fontWeight: 'bold', 
   margin:20,
   width:120,
   height:50,
   alignItems:'center',
   justifyContent:'center',
   margin:30,
   backgroundColor:'#168fc7',
   fontSize:20
},
holiday:
{
padding: 10, 
borderWidth: 1,
color: 'black', 
fontWeight: 'bold', 
 margin:5,
 width:130,
 height:60,
 alignItems:'center',
 justifyContent:'center',
 margin:30,
 backgroundColor:'#42f5b0',
 fontSize:20,
 fontFamily:'Roboto'
},
}
)

export default HolidayCalendar;