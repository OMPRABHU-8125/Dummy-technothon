import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert, KeyboardAvoidingView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useAppDispatch } from '../../store/hook';
import { setUserProfile, setModules } from '../../store/slice/profileSlice';
import styles from './Login.style';
import modules from './Modules';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { black, gray } from '../utils/color';
import { teachermodule, studentmodule, guestmodule, parentmodule } from './Modules';
import { compare } from 'react-native-bcrypt';
import auth from '@react-native-firebase/auth'

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState();
    const [verificationId, setVerificationId] = useState();
    const [otpVisible, setOtpVisible] = useState(false);

    const dispatch = useAppDispatch();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Fields cannot be empty");
        } else {
            const users = firestore().collection('Users');

            const querySnapshot = await users
                .where('email', '==', email)
                .limit(1)
                .get();

            if (querySnapshot.empty) {
                Alert.alert("Error", "User not found");
                return;
            }

            const user = querySnapshot.docs[0].data();
            const hashedPassword = user.password;

            compare(password, hashedPassword, async (error, isMatch) => {
                if (isMatch) {
                    dispatch(setUserProfile(user));
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

                    navigation.navigate('HomeScreen');
                    await AsyncStorage.setItem("userData", JSON.stringify(user));
                } else {
                    Alert.alert("Error", "Invalid email or password");
                }
            });
        }
    };

    const toggleOtpModal = () => {
        setShowOtpModal(!showOtpModal);
    };

    const sendOtp = async () => {
        try {
            const users = firestore().collection('Users');

            const querySnapshot = await users
                .where('email', '==', email)
                .limit(1)
                .get();

            if (querySnapshot.empty) {
                Alert.alert("Error", "User not found");
                return;
            }

            const user = querySnapshot.docs[0].data();

            const confirmation = await auth().signInWithPhoneNumber('+91' + user.phoneNo);
            setVerificationId(confirmation);

            Alert.alert("Success", "OTP has been sent to your registered mobile number");
            setOtpVisible(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const credential = auth.PhoneAuthProvider.credential(verificationId.verificationId, otp);
            const response = await auth().signInWithCredential(credential);
            if (response && response.user) {
                const users = firestore().collection('Users');

                const querySnapshot = await users
                    .where('email', '==', email)
                    .limit(1)
                    .get();

                const user = querySnapshot.docs[0].data();

                dispatch(setUserProfile(user));
                const filtered = modules.filter((module) =>
                    module.login.includes(user.loginType)
                );
                dispatch(setModules(filtered));
                navigation.navigate('HomeScreen');
                await AsyncStorage.setItem("userData", JSON.stringify(user));
            } else {
                Alert.alert('Error', 'Invalid OTP');
            }
        } catch (error) {
            Alert.alert('Error', 'Invalid OTP');
        }
    };



    return (
        <KeyboardAvoidingView style={styles.container}>
            <Image
                source={require('../assets/imgs/logo.png')}
                style={styles.logo}
            />
            <Text></Text>
            <Text style={styles.text}>VES Login</Text>
            <View style={{ flexDirection: 'row' }}>
                {/* <View > */}
                <FontAwesome name={'user-circle-o'} size={20} color={black} style={styles.usericon} />
                {/* </View> */}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor={'grey'}
                />
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Fontisto name={'locked'} size={20} color={black} style={styles.lockicon} />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={!visible}
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor={'grey'}
                />

                <TouchableOpacity style={styles.eyeicon} onPress={() => {
                    setVisible(!visible);
                }}>
                    <MaterialIcons name={visible ? 'visibility' : 'visibility-off'} size={25} color={black} />
                </TouchableOpacity>
            </View>
            <Text></Text>
            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={toggleOtpModal}
            >
                <Text style={styles.buttonText}>Login using OTP</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("SignUp");
                }}
            >
                <Text style={styles.lower}>Don't have an account Signup! </Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                visible={showOtpModal}
                onRequestClose={() => {
                    toggleOtpModal();
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Your Email:</Text>
                        <TextInput
                            style={styles.otpInput}
                            placeholder="name@sample.com"
                            value={email}
                            onChangeText={setEmail}
                            placeholderTextColor={gray}
                            color={black}
                        />
                    </View>

                    {
                        otpVisible ?
                            <View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Enter OTP:</Text>
                                    <TextInput
                                        style={styles.otpInput}
                                        placeholder="Enter OTP Sent to your verified number"
                                        value={otp}
                                        onChangeText={setOtp}
                                        placeholderTextColor={gray}
                                        color={black}
                                        keyboardType='phone-pad'
                                    />
                                </View>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={handleVerifyOTP}
                                >
                                    <Text style={styles.buttonText}>Verify and Login</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={sendOtp}
                                >
                                    <Text style={styles.buttonText}>Resend OTP</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <TouchableOpacity
                                style={styles.button}
                                onPress={sendOtp}
                            >
                                <Text style={styles.buttonText}>Send OTP</Text>
                            </TouchableOpacity>
                    }
                </View>
            </Modal>

        </KeyboardAvoidingView>
    );
};

export default Login;
