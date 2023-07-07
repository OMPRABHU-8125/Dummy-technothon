import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Text
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './SignUp.style';
import * as COLOR from '../utils/color'
import Icon from 'react-native-vector-icons/MaterialIcons';

const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNo, setContactNo] = useState('');
    const [loginType, setLoginType] = useState('');
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [items, setItems] = useState([
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' }
    ]);
    const [logins, setLogins] = useState([
        { label: 'Student', value: 'Student' },
        { label: 'Parent', value: 'Parent' },
        { label: 'Faculty', value: 'Faculty' }
    ]);
    const [child, setChild] = useState('');

    const [emails, setEmails] = useState('');
    const [captchaText, setCaptchaText] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    const getEmails = async () => {
        try {
            const snapshot = await firestore()
                .collection('Users')
                .get();

            const emailList = snapshot.docs.map((doc) => doc.data().email);
            setEmails(emailList)
        } catch (error) {

        }
    }

    useEffect(() => {
        getEmails();
        regenerateCaptcha()
    }, [])

    function generateCaptcha() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return captcha;
    }

    function regenerateCaptcha() {
        setCaptchaText(generateCaptcha());
        setUserInput('')
        setIsVerified(false)
    }

    const checkCaptcha = () => {
        if (userInput == captchaText)
            setIsVerified(true)

        else {
            Alert.alert("Error", "Invalid Captcha")
            regenerateCaptcha()
        }
    }
    const handleSignup = () => {
        if (!email || !password || !firstName || !lastName || !gender || !phoneNo || !loginType || !isVerified)
            Alert.alert("Error", "Fields cannot be empty")

        else {
            if (emails.includes(email))
                Alert.alert("Error", "User already exists")

            else {

                const user = {
                    email,
                    password,
                    firstName,
                    lastName,
                    gender,
                    phoneNo,
                    loginType,
                    child: (loginType == 'Parent') ? child : null
                };

                // Save the user document to the Firestore database
                firestore()
                    .collection('Users')
                    .add(user)
                    .then(() => {
                        Alert.alert(
                            "Success",
                            "User created Successfully",
                            [
                                {
                                    text: 'Ok'
                                },
                                {
                                    text: "Go to Login Screen",
                                    onPress: () => { navigation.navigate("Login") }
                                }
                            ],
                            [
                                {
                                    cancelable: true
                                }
                            ]

                        )

                        // Handle successful signup, such as navigating to the login screen
                    })
                    .catch((error) => {
                        console.error('Error creating user:', error);
                        // Handle error during signup
                    });
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>SignUp</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={COLOR.grey}
                color={COLOR.black}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                placeholderTextColor={COLOR.grey}
                color={COLOR.black}
            />
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                placeholderTextColor={COLOR.grey}
                color={COLOR.black}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                placeholderTextColor={COLOR.grey}
                color={COLOR.black}
            />
            <DropDownPicker
                style={styles.picker}
                textStyle={{ color: '#000' }}
                placeholder='Select your gender'
                dropDownDirection="TOP"
                open={open}
                value={gender}
                items={items}
                setOpen={setOpen}
                setValue={setGender}
                setItems={setItems}
            />
            <TextInput
                style={styles.input}
                placeholder="Contact Number"
                value={phoneNo}
                onChangeText={setContactNo}
                placeholderTextColor={COLOR.grey}
                color={COLOR.black}
            />

            <DropDownPicker
                style={styles.picker}
                textStyle={{ color: '#000' }}
                placeholder='Select your login type'
                open={open1}
                value={loginType}
                items={logins}
                setOpen={setOpen1}
                setValue={setLoginType}
                setItems={setLogins}
            />
            {
                loginType == 'Parent' ?
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Child's Email"
                        value={child}
                        onChangeText={setChild}
                        placeholderTextColor={COLOR.grey}
                        color={COLOR.black}
                    />
                    :
                    null
            }

            <View style={styles.captchaContainer}>
                <TouchableOpacity onPress={regenerateCaptcha}>
                    <Text style={styles.captchaText}>{captchaText}</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.inputCaptcha}
                    value={userInput}
                    onChangeText={setUserInput}
                    placeholder='Enter captcha'
                    placeholderTextColor={COLOR.grey}
                    onEndEditing={checkCaptcha}
                    color={COLOR.black}
                />
                {
                    isVerified ?
                        <Icon name={'verified'} size={26} color={COLOR.blue} style={styles.icon} />
                        :
                        null
                }

            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={handleSignup}
            >
                <Text style={{ color: '#fff' }}>SignUp</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { navigation.navigate("Login") }}
            >
                <Text style={styles.text}>Go back to Log In</Text>
            </TouchableOpacity>
        </View>

    );
};


export default SignUp;
