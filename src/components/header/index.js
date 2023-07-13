import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './header.styles';
import LinearGradient from 'react-native-linear-gradient';
import LineIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppSelector } from '../../../store/hook';

const CustomHeader = ({ title, navigation }) => {
    const [isVisible, setIsVisible] = useState(false)
    const user = useAppSelector(state => state.profile.data);
    useEffect(() => {
        checkUser();
    }, [])

    const checkUser = () => {
        if (user.loginType != 'Guest') {
            setIsVisible(true)
        }
    }

    const renderHeader = () => {
        if (title === 'Home') {
            return (
                <LinearGradient
                    colors={['#FDF27C', '#FEBA35']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={styles.Homecontainer}
                >
                    <TouchableOpacity onPress={async () => {
                        navigation.navigate('Home');
                    }}
                    >
                        <MaterialIcon name="home" size={30} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={async () => {
                        navigation.navigate('Login');
                        await AsyncStorage.removeItem("userData");
                    }} style={styles.icon}>
                        {isVisible ? (
                            <LineIcons name="power" size={26} color='rgb(145, 41, 40)'/>
                        ) : (
                            <LineIcons name="login" size={26} color="black" />
                        )}
                    </TouchableOpacity>
                </LinearGradient>
            );
        } else {
            return (
                <LinearGradient
                    colors={['#EE5353', '#800000']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={styles.Container}
                >
                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }} style={styles.tabIcon}>
                        <Icons name="chevron-back-sharp" size={30} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.TabTitle}>{title}</Text>
                </LinearGradient>
            );
        }

    };

    return renderHeader();
};

export default CustomHeader;