import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet,
    Alert,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import { useAppSelector } from '../store/hook';

const Home = ({ navigation }) => {

    const user = useAppSelector(state => state.profile.data);
    const [apiData, setData] = useState([]);


    useEffect(() => {
        console.log(user)
    }, []);

    // const getData = () => {
    //     fetch('https://myjsons.com/v/39e41248')
    //         .then(data => data.json())
    //         .then(response => {
    //             setData(response)
    //         })
    //         .catch(error => {
    //             Alert.alert("Warning")
    //         })
    // }

    return (
        <View style={styles.body}>
            <ImageBackground
                source={require("../imgs/campus.png")}
                style={styles.image}
            >
                <Text style={styles.heading}>
                    Welcome {user.firstName}
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('Login')
                    }}
                >
                    <Text style={styles.smallText}>Logout</Text>
                </TouchableOpacity>
            </ImageBackground>
            <View style={styles.body}>
                <View style={styles.main}>
                    <View style={styles.card}>
                        <Text style={styles.title}>Name</Text>
                        <Text style={styles.description}>{user.firstName} {user.lastName}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.title}>Email</Text>
                        <Text style={styles.description}>{user.email}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.title}>Contact No</Text>
                        <Text style={styles.description}>{user.phoneNo}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.title}>Gender</Text>
                        <Text style={styles.description}>{user.gender}</Text>
                    </View>


                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#dad7cd',
    },

    main: {
        margin: 20
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'white'
    },

    description: {
        fontSize: 18,
        color: '#e9d8a6',
    },

    card: {
        backgroundColor: '#344e41',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
        width: '80%'
    },

    container: {
        flexDirection: 'column',
        flex: 1
    },

    smallText: {
        color: 'white',
        fontSize: 10,
    },

    image: {
        width: 400,
        height: 200,
        resizeMode: 'stretch',
        flexDirection: 'row'
    },

    inner: {
        borderColor: 'black',
        padding: 10,
        margin: 20,
        borderWidth: 1,
        borderRadius: 10
    },

    logo: {
        width: 100,
        height: 100,
        margin: 20
    },

    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        borderColor: 'black',
    },

    heading: {
        color: '#700000',
        fontSize: 33
    },

    input: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        backgroundColor: "#ffffff",
        marginTop: 130,
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 20,
        borderRadius: 10,
        color: 'black'
    },

    input1: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        backgroundColor: "#ffffff",
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 20,
        borderRadius: 10,
        color: 'black'
    },

    button: {
        backgroundColor: 'red',
        width: 55,
        height: 30,
        borderRadius: 5,
        marginLeft: 27,
        marginRight: 10,
        paddingHorizontal: 10,
        paddingTop: 5,
        marginTop: 10
    },

    buttonText: {
        color: '#F0F0F0'
    }
});



export default Home;