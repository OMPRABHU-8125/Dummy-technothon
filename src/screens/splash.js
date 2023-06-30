import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const splash = () => {
    const navigation = useNavigation();

    useEffect(() => {
        checkFirstTime();
    }, []);

    const checkFirstTime = async () => {
        try {
            const userType = await AsyncStorage.getItem('userType');
            console.log(userType);
            if (userType === null) {
                setTimeout(() => {
                    navigation.navigate('Login');
                }, 5000);
            } else {
                setTimeout(() => {
                    navigation.navigate(userType);
                }, 5000);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <View style={{ backgroundColor: 'rgb(200, 256, 256)', flex: 1, padding: 20, justifyContent: 'center' }}>
            <Text style={{ color: 'blue', fontSize: 45, alignSelf: 'center' }}>Welcome to App</Text>
            <Text></Text>
            <Text style={{ color: 'blue', fontSize: 24, alignSelf: 'center' }}>Please Wait</Text>
            <Text></Text>
            <Text style={{ color: 'blue', fontSize: 24, alignSelf: 'center' }}>Loading...</Text>
        </View>
    );
};

export default splash;
