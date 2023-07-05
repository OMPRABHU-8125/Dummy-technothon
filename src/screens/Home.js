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

const modules = [
    {
        id: 1,
        title: 'Alumni and Mentorship',
        login: ['Student', 'Teacher'],

    },
    {
        id: 2,
        title: 'Attendance',
        login: ['Student', 'Parent', 'Teacher'],

    },
    {
        id: 3,
        title: 'Events Update',
        login: ['Student'],
    },
    {
        id: 4,
        title: 'Enquiry Management',
        login: ['Student', 'Parent', 'Teacher'],
    },
    {
        id: 5,
        title: 'Fees',
        login: ['Parent'],
    },
    {
        id: 6,
        title: 'Photo Gallery',
        login: ['Student', 'Teacher'],
    },
    {
        id: 7,
        title: "About Us",
        login: ['Student', 'Parent',],
    },
    {
        id: 8,
        title: 'FAQs',
        login: ['Student', 'Parent', 'Teacher'],
    },
    {
        id: 9,
        title: 'Faculty Load',
        login: ['Teacher'],
    },
    {
        id: 10,
        title: 'Holiday Calender',
        login: ['Student', 'Teacher'],
    },
    {
        id: 11,
        title: 'Stationary Supply Hub',
        login: ['Student', 'Parent'],
    },
    {
        id: 12,
        title: 'Fitness And Health',
        login: ['Student', 'Parent', 'Teacher'],
    }


]



const Home = ({ navigation }) => {
    const user = useAppSelector(state => state.profile.data);
    const [data, setData] = useState([]);

    useEffect(() => {
        const filtered = modules.filter(module => module.login.includes(user.loginType));
        setData(filtered);
    }, []);

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
                    else if (item.title == 'Faculty Load') {
                        navigation.navigate("Facultyload")
                    }
                    else if (item.title == 'Stationary Supply Hub') {
                        navigation.navigate("Stationary")
                    }
                    else if (item.title == 'Alumni and Mentorship') {
                        navigation.navigate("Alumni")
                    }
                    else if (item.title == 'Fees') {
                        navigation.navigate("Fees")
                    }
                    else if (item.title == 'Holiday Calender') {
                        navigation.navigate("HolidayCalendar")
                    }
                    else if (item.title == 'FAQs') {
                        navigation.navigate("FAQ")
                    }
                    else if (item.title == 'Fitness And Health'){
                         navigation.navigate("FitnessAndHealth")
                    }
                }

                }>



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