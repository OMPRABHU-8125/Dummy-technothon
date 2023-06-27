import React, { useEffect, useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import { useAppSelector } from '../../../store/hook';
import firestore from '@react-native-firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';

const DailyAttendance = ({ navigation }) => {
    const user = useAppSelector(state => state.profile.data);
    const [subjects, setSubjects] = useState([]);
    const [subject, setSubject] = useState(null)
    const [open, setOpen] = useState(false);
    const [students, setStudents] = useState([]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => prevIndex + 1);

    };

    const fetchSubjects = () => {
        const sub = user.subjects;

        const subjectData = sub.map((doc) => ({
            label: doc.subjectName,
            value: doc.subjectName,
        }));

        setSubjects(subjectData);

    }

    useEffect(() => {
        setCurrentIndex(0);
        fetchSubjects();
        getStudents();
        // console.log(subject)

    }, [])

    const getStudents = async () => {
        try {
            const snapshot = await firestore()
                .collection('Users')
                .where('loginType', '==', 'Student')
                .get();

            const studentsList = snapshot.docs.map((doc) => doc.data().firstName);
            setStudents(studentsList)
        } catch (error) {

        }
    }

    const handleClick = (text) => () => {
        if (subject != null) {
            console.log(`${students[currentIndex]} is ${text} in ${subject}`)
            if (currentIndex < students.length)
                handleNext();
        }

        else {
            Alert.alert("Error", "Please select a subject")
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome, {user.firstName}!</Text>

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.label}>Select a subject: </Text>
                <DropDownPicker
                    style={styles.picker}
                    textStyle={{ color: 'black' }}
                    placeholder='Subjects'
                    dropDownDirection="BOTTOM"
                    open={open}
                    value={subject}
                    items={subjects}
                    setOpen={setOpen}
                    setValue={setSubject}
                    setItems={setSubjects}
                    containerStyle={{ width: '70%' }}
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.heading1}>{currentIndex < students.length ? `Student ${currentIndex + 1}` : 'List Over'}</Text>
                <Text style={styles.heading}>{students[currentIndex]}</Text>
                {
                    currentIndex < students.length ?
                        <View style={{ flexDirection: 'row', marginTop: 40 }}>
                            <TouchableOpacity
                                style={styles.buttonP}
                                onPress={handleClick('Present')}
                                disabled={currentIndex === students.length}
                            >
                                <Text style={styles.buttonText}>Present</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonA}
                                onPress={handleClick('Absent')}
                                disabled={currentIndex === students.length}
                            >
                                <Text style={styles.buttonText}>Absent</Text>
                            </TouchableOpacity>
                        </View>

                        :
                        <TouchableOpacity
                            style={styles.buttonG}
                            onPress={() => { navigation.navigate('Attendance') }}
                        >
                            <Text style={styles.buttonText}>Go Back</Text>
                        </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#912929'
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#fbe98d'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
        marginTop: 10,
        color: 'white'
    },
    card: {
        width: 300,
        height: 300,
        marginTop: 100,
        alignItems: 'center',
        padding: 20
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'white'
    },
    heading1: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#fdf1b7'
    },
    buttonP: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        marginHorizontal: 10
    },
    buttonA: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        marginHorizontal: 10
    },
    buttonG: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        marginHorizontal: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    picker: {
        height: 40,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 20,
    },
});

export default DailyAttendance;