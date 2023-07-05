import React, { useEffect } from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../store/hook';
import { setModules, setUserProfile } from '../../store/slice/profileSlice';
import styles from './splash.style';

const modules = [
    {
        id: 1,
        title: 'Alumni and Mentorship',
        login: ['Student', 'Teacher']
    },
    {
        id: 2,
        title: 'Attendance',
        login: ['Student', 'Parent', 'Teacher']
    },
    {
        id: 3,
        title: 'Events Update',
        login: ['Student']
    },
    {
        id: 4,
        title: 'Enquiry Management',
        login: ['Student', 'Parent', 'Teacher']
    },
    {
        id: 5,
        title: 'Fees',
        login: ['Parent']
    },
    {
        id: 6,
        title: 'Photo Gallery',
        login: ['Student', 'Teacher']
    },
    {
        id: 7,
        title: "About Us",
        login: ['Student', 'Parent',]
    },
    {
        id: 8,
        title: 'FAQs',
        login: ['Student', 'Parent', 'Teacher']
    },
    {
        id: 9,
        title: 'Faculty Load',
        login: ['Teacher']
    },
    {
        id: 10,
        title: 'Holiday Calender',
        login: ['Student', 'Teacher']
    },
    {
        id: 11,
        title: 'Stationary Supply Hub',
        login: ['Student', 'Parent']
    },

]

const Splash = () => {

    const dispatch = useAppDispatch();

    const navigation = useNavigation();

    useEffect(() => {
        checkFirstTime();
    }, []);

    const checkFirstTime = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData === null) {
                setTimeout(() => {
                    navigation.navigate('Login');
                }, 2000);
            } else {
                const user = JSON.parse(userData);
                console.log(user.firstName);

                dispatch(setUserProfile(user));
                const filtered = modules.filter((module) =>
                    module.login.includes(user.loginType));

                dispatch(setModules(filtered));
                setTimeout(() => {
                    navigation.navigate('Home');
                }, 2000);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <SafeAreaView style={styles.safeview}>
            <View style={styles.splashview}>
                <Image source={require('../assets/imgs/logo.png')}
                    style={styles.logo} />
            </View>
            <View style={styles.loadingview}>
                <Text style={styles.loading}>Loading...</Text>
            </View>
        </SafeAreaView >
    );
};

export default Splash;
