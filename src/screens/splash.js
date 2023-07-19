import React, { useEffect } from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../store/hook';
import { setModules, setUserProfile } from '../../store/slice/profileSlice';
import styles from './splash.style';
import { parentmodule, guestmodule, studentmodule, teachermodule } from './Modules';

const Splash = () => {

    const dispatch = useAppDispatch();

    const navigation = useNavigation();

    useEffect(() => {
        checkFirstTime();
    }, []);

    const checkFirstTime = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            const user = JSON.parse(userData);
            dispatch(setUserProfile(user));

            if (userData == null) {
                const guest = {
                    email: null,
                    fees: null,
                    firstName: 'Guest',
                    gender: null,
                    lastName: null,
                    loginType: 'Guest',
                    password: null,
                    phoneNo: null,
                }
                dispatch(setUserProfile(guest));
                dispatch(setModules([{
                    id: '1',
                    title: 'Basic Components',
                    data: [...guestmodule]
                }]));
            }
            else {
                if (user.loginType == 'Student') {
                    dispatch(setModules([
                        {
                            id: '1',
                            title: 'Student Components',
                            data: [...studentmodule]
                        },
                        {
                            id: '2',
                            title: 'Basic Components',
                            data: [...guestmodule]
                        }
                    ]));
                }
                else if (user.loginType == 'Teacher') {
                    dispatch(setModules([
                        {
                            id: '1',
                            title: 'Teacher Components',
                            data: [...teachermodule]
                        },
                        {
                            id: '2',
                            title: 'Basic Components',
                            data: [...guestmodule]
                        }
                    ]));
                }
                else if (user.loginType == 'Parent') {
                    dispatch(setModules([
                        {
                            id: '1',
                            title: 'Parent Components',
                            data: [...parentmodule]
                        },
                        {
                            id: '2',
                            title: 'Basic Components',
                            data: [...guestmodule]
                        }
                    ]));
                }
            }
            setTimeout(() => {
                navigation.navigate("HomeScreen");
            }, 1000);

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

