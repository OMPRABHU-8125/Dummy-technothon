import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Style from "./EventUpdate.styles";
import { useAppSelector } from "../../../store/hook";

const EventUpdate = ({ navigation }) => {
    const [mydata, setmydata] = useState([])
    const [isVisible, setIsVisible] = useState(false);
    const user = useAppSelector(state => state.profile.data);
    useEffect(() => {
        getDatabase()
    }, [])

    const getDatabase = async () => {
        try {
            const querySnapshot = await firestore().collection('EventUpdate').get();
            const data = querySnapshot.docs.map(doc => doc.data());
            setmydata(data);
        } catch (error) {
            console.log('Error getting data:', error);
        }
        checkUser()
    }

    const checkUser = () => {
        if (user.loginType == 'Teacher') {
            setIsVisible(true)
        }
    }
    const renderItems = ({ item }) => {
        const firestoreTimestamp = item.Eventdate;
        const firestoreDate = firestoreTimestamp && firestoreTimestamp.toDate ? firestoreTimestamp.toDate() : null;
        const currentDate = new Date();
        if (firestoreDate && firestoreDate.getTime() > currentDate.getTime()||item.Eventdate>currentDate.getTime()) {
            return (
                <View>
                    <View>
                        <Image source={{ uri: item.Image }}
                            style={Style.image} />
                    </View>
                    <View style={Style.renderView}>
                        {/* <View style={Style.titleView}>
                            <Text style={Style.titleText}> {item.Title} </Text>
                        </View> */}
                        <Text style={Style.titleText}> {item.Title} </Text>
                        <View style={Style.descView}>
                            <Text style={Style.descText}> {item.Desc} </Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Detail', { itemTitle: item.Title })}>
                                <Text>Detail</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            )
        }
        return null;
    }

    return (
        <View style={Style.mainView}>
            {/* <View style={Style.view}>
                <Text style={Style.text}>Events!!</Text>
            </View> */}

            <FlatList
                data={mydata}
                renderItem={renderItems}
                keyExtractor={(item) => item.id}
            />
            {isVisible && (
                <TouchableOpacity
                    style={Style.button}
                    onPress={() => navigation.navigate('AddEvent')}>
                    <Text style={Style.text}>Add Event</Text>
                </TouchableOpacity>
            )
            }
             <Text></Text>
            <TouchableOpacity
                    style={Style.button}
                    onPress={() => navigation.navigate('CompletedEvent')}>
                    <Text style={Style.text}>Completed Events</Text>
                </TouchableOpacity>

        </View>

    )
}
export default EventUpdate
