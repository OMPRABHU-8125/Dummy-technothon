import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import { white, maroon, shadowcolor } from '../utils/color';


const windowWidth = Dimensions.get("window").width;
const windowheight = Dimensions.get("window").height;

const styles = StyleSheet.create({

    view: {
        flex: 1,
    },

    image: {
        width: "100%",
        height: 280,
        resizeMode: 'contain',
    },
    contentContainer: {
        height: windowheight + 200,
        flexGrow: 1,
    },

    card1: {
        width: windowWidth / 2 - 20,
        height: 100,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        shadowColor: shadowcolor,
        backgroundColor: white,
        elevation: 10,
    },

    title: {
        fontSize: 12,
        fontWeight: 'bold',
        color: maroon,
    },

    welcome: {
        backgroundColor: maroon,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },

    welcome_text: {
        fontWeight: 'bold',
        color: white,
        fontSize: 25,
    },
});

export default styles;