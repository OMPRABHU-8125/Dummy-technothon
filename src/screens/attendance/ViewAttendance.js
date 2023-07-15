import React, { useEffect, useState } from 'react';
import {
    View,
    Text
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useAppSelector } from '../../../store/hook';

const ViewAttendance = () => {
    const user = useAppSelector((state) => state.profile.data);

    const [fetchedAttendance, setFetchedAttendance] = useState([]);

    const getData = async () => {
        try {
            const snapshot = await firestore()
                .collection('Attendance')
                .where('facultyId', '==', user.email)
                .get();

            const data = [];
            snapshot.forEach((doc) => {
                const docData = doc.data();
                data.push(docData);
            });

            setFetchedAttendance(data); // Set the fetched attendance data in state
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <View>
            <Text>Hello</Text>
            {fetchedAttendance.map((attendanceData, index) => (
                <Text key={index}>
                    Student Name: {attendanceData.attendance[index].studentName}, Status: {attendanceData.attendance[index].status}
                </Text>
            ))}
        </View>
    );
};

export default ViewAttendance;
