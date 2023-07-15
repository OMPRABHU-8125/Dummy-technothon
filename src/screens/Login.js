import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useAppDispatch } from '../../store/hook';
import { setUserProfile, setModules } from '../../store/slice/profileSlice';
import styles from './Login.style';
import modules from './Modules';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { black } from '../utils/color';
import { compare } from 'react-native-bcrypt';

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
                    const filtered = modules.filter((module) =>
                        module.login.includes(user.loginType)
                    );
                    dispatch(setModules(filtered));
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
            <Text></Text>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("SignUp");
                }}
            >
                <Text style={styles.lower}>Don't have an account Signup! </Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    );
};

export default Login;
