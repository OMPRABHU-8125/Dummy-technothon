import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const EventUpdate = () => {
    const [mydata, setmydata] = useState([])

    useEffect(() => {
        getDatabase()
        console.log(mydata)
    }, [])

    const getDatabase = async () => {
        try {
            const querySnapshot = await firestore().collection('EventUpdate').get();
            const data = querySnapshot.docs.map(doc => doc.data());
            setmydata(data);
            //   console.log(data);
        } catch (error) {
            console.log('Error getting data:', error);
        }
    }

    const renderItems = ({ item }) => {
        return (
            <View style={{
                alignSelf: 'center', backgroundColor: 'rgb(255, 255, 225)', padding: 10, margin: 20, elevation: 50, width: 350, height: 350, borderBlockColor: 'brown', borderWidth: 10, borderTopLeftRadius: 20,
                borderBottomRightRadius: 20,overflow: 'visible'}}>
                <View style={{ alignSelf: 'center', backgroundColor: '#A80000', padding: 10, width: 320,borderTopLeftRadius: 20, borderBottomRightRadius: 20,  }}>
                    <Text style={{ fontSize: 40, backgroundColor: 'rgba(255,0,0,0)',color:'rgb(255, 255, 225)'}}> {item.Title} </Text>
                </View>
                <View style={{ alignSelf: 'center', padding: 10, }}>
                    <Text style={{ fontSize: 30,color:'black' }}> {item.Desc} </Text>
                </View>
            </View>

        )
    }

    return (
        <View style={{marginBottom:20,flex:1}}>
            <View>
            <Image source={{ uri: 'https://t4.ftcdn.net/jpg/02/16/94/65/360_F_216946587_rmug8FCNgpDCPQlstiCJ0CAXJ2sqPRU7.jpg' }}
                style={{ width: 390, height: 200, alignSelf: 'center', borderColor: 'orange', borderWidth: 10 }} />
            </View>
                <FlatList
                    data={mydata}
                    renderItem={renderItems}
                    keyExtractor={(item) => item.id}
                />
                
        </View>

    )
}
export default EventUpdate
