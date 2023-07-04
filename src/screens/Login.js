import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useAppDispatch } from '../../store/hook';
import { setUserProfile } from '../../store/slice/profileSlice';
import styles from './Login.style';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);

    const dispatch = useAppDispatch();

    const handleLogin = async () => {

        if (!email || !password) {
            Alert.alert("Error", "Fields cannot be empty")
        }

        else {
            const users = firestore().collection('Users');

            const querySnanpshot = await users
                .where('email', '==', email)
                .where('password', '==', password)
                .get();
            if (querySnanpshot.size == 1) {
                console.log("Logged In")
                const user = querySnanpshot.docs[0].data();
                dispatch(setUserProfile(user));
                navigation.navigate('HomeScreen')
            }

            else {
                Alert.alert("Error", "User not found");
            }
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Image
                source={require('../assets/imgs/logo.png')}
                style={styles.logo}
            />
            <Text></Text>
            <Text style={styles.text}>VES Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={'grey'}
            />
            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={!visible}
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor={'grey'}
                />
                <TouchableOpacity
                    onPress={() => {
                        setVisible(!visible);
                    }}
                >
                    <Image
                        source={require('../assets/imgs/eye.png')}
                        style={styles.icon}
                    />
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
