import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert, KeyboardAvoidingView, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useAppDispatch } from '../../store/hook';
import { setUserProfile, setModules } from '../../store/slice/profileSlice';
import styles from './Login.style';
import modules from './Modules';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { black, red } from '../utils/color';
import { teachermodule, studentmodule, guestmodule, parentmodule } from './Modules';
import { compare } from 'react-native-bcrypt';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);

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
                    console.log("Logged In");
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

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.backgroundView}>
                <ImageBackground
                    source={require('../assets/imgs/Swami_Login.png')}
                    style={styles.logo}
                >
                    <View style={styles.logoView}>
                        <Image
                            source={require('../assets/imgs/ves_logo_name.png')}
                            style={styles.logoImg}
                        />
                    </View>


                </ImageBackground>
            </View>
            <View style={styles.textView}>
                <Text style={styles.text}>WELCOME TO VES APP</Text>
            </View>
            <View style={styles.inputView}>
                <View style={styles.inputiconView}>
                    <FontAwesome name={'user-circle-o'} size={20} color={black} style={styles.usericon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        placeholderTextColor={'grey'}
                        keyboardType='email-address'

                    />
                </View>

                <View style={styles.inputiconView}>
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
                <Text></Text>
                <View style={styles.inputiconView}>
                    <Text style={styles.nullaccount}>Don't have an account</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("SignUp");
                        }}
                    >
                        <Text style={styles.lower}>Signup!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Login;
