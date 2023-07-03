import React, { useState } from 'react';
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

    const handleSignup = () => {

        const user = {
            email,
            password,
            firstName,
            lastName,
            gender,
            phoneNo,
            loginType
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
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>SignUp</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
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

            <Text></Text>
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
