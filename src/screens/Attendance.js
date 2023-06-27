import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
    Alert
} from 'react-native';

const Attendance = ({ navigation }) => {
    return (
        <View style={styles.main}>
            <Text style={styles.heading}>Attendance</Text>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('DailyAttendance')
                    }}
                    style={styles.clickable}
                >
                    <View>
                        <View style={{ padding: 10 }}>
                            <Text style={styles.cardTitle}>Daily Attendance</Text>
                            <Text style={styles.cardText}>Edit the daily attendance of students</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.clickable}
                    onPress={() => {
                        Alert.alert("Error", " Developement in Progress")
                    }}
                >
                    <View>
                        <View style={{ padding: 10 }}>
                            <Text style={styles.cardTitle}>Monthly Attendance</Text>
                            <Text style={styles.cardText}>View the monthly attendance of students</Text>
                        </View>
                    </View>
                </TouchableOpacity >
            </View >

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#fef7d7',
        paddingTop: 20
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    main: {
        backgroundColor: '#a82c2c',
    },
    image: {
        width: 200,
        height: 200,
        marginVertical: 400,
        marginHorizontal: 130
    },
    heading: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#fbe682',
        marginBottom: 16,
        marginLeft: 10,
        marginTop: 10
    },
    // card: {
    //     width: 150,
    //     height: 200,
    //     backgroundColor: 'white',
    //     borderRadius: 8,
    //     marginVertical: 10,
    //     marginHorizontal: 20,
    //     shadowColor: '#000',
    //     shadowOffset: {
    //         width: 0,
    //         height: 2,
    //     },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 3.84,
    //     elevation: 5,
    //     backgroundColor: '#2a9d8f'
    // },
    clickable: {
        width: 150,
        height: 200,
        backgroundColor: 'white',
        borderRadius: 8,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#2a9d8f'
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#000000'
    },
    cardText: {
        fontSize: 16,
        color: '#495057',
    },

    body: {
        backgroundColor: 'black',
        flex: 1
    }
});

export default Attendance;
