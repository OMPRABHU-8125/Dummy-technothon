import React, { useState, useEffect } from 'react';

import {
    View,
    Text,
    FlatList,
    Alert,
    ImageBackground,
    TouchableOpacity,
    useWindowDimensions,
    Image,
} from 'react-native';
import { useAppSelector } from '../../store/hook';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './Home.styles';


const Card = ({ title }) => {
    return (
        <View style={styles.outercard}>
            <View style={styles.card1}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    );
};



const Home = ({ navigation }) => {
    const user = useAppSelector(state => state.profile.data);
    const data = useAppSelector(state => state.profile.modules);

    useEffect(() => {
        console.log(user);
    }, [])

    const renderCard = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (item.title == 'Attendance') {
                        if (user.loginType == 'Teacher') {
                            navigation.navigate("Attendance")
                        }

                        else {
                            Alert.alert("Warning", "You are not allowed to access this feature")
                        }
                    }
                    else if (item.title == 'Events Update') {
                        navigation.navigate("EventUpdate")
                    }
                    else if (item.title == 'About Us') {
                        navigation.navigate("AboutUs")
                    }

                    else if (item.title == 'Enquiry Management') {
                        navigation.navigate("Queries/Feedback")
                    }
                    else if (item.title == 'Stationary Supply Hub')
                        navigation.navigate("Stationary")
                    else if (item.title == 'Alumni and Mentorship')
                        navigation.navigate("Alumni")

                    else if (item.title == 'Fees')
                        navigation.navigate("Fees")

                }

                }
            >

                <Card title={item.title} />
            </TouchableOpacity >
        )
    };
    return (
        <View style={styles.view}>
            <ImageBackground
                source={require('../assets/imgs/Swami_Vivekanand.jpg')}
                style={styles.image}>
            </ImageBackground>
            <TouchableOpacity
                style={styles.logoutbutton}
                onPress={() => {
                    navigation.navigate('Login');
                }}>
                <Image source={require('../assets/imgs/logoutimage.png')} style={styles.logoutimage} />
            </TouchableOpacity>
            <View style={styles.welcome}>
                <Text style={styles.welcome_text}>WELCOME TO VES</Text>
            </View>
            <FlatList
                data={data}
                renderItem={renderCard}
                keyExtractor={item => item.id}
                numColumns={2}
            />
        </View>
    );
};

export default Home;