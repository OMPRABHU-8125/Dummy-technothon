import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';


const windowWidth = Dimensions.get("window").width;
const windowheight = Dimensions.get("window").height;

const styles = StyleSheet.create({

    view: {
        flex: 1,
    },

    smallText: {
        color: 'blue',
        fontSize: 9,
        fontWeight: 'bold',
    },

    image: {
        width: "100%",
        height: 280,
        resizeMode: 'contain',
    },
    contentContainer: {
        height: windowheight - 90,
        flexGrow: 1,
    },

    card1: {
        width: windowWidth / 2 - 20,
        height: 100,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        shadowColor: 'rgb(145, 41, 40)',
        backgroundColor: '#fff',
        elevation: 10,
    },

    title: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'rgb(145, 41, 40)',
    },

    welcome: {
        backgroundColor: 'rgb(145,41, 40)',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },

    welcome_text: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 25,
    },
});

export default styles;