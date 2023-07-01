import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    view: {
        flex: 1
    },

    inner: {
        margin: 20,
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


    button: {
        backgroundColor: '#fff',
        width: 54,
        height: 20,
        top: 5,
        left: 300,
        borderRadius: 8,
        paddingTop: 3,
        paddingHorizontal: 12,
        elevation: 15,
    },

    card1: {
        width: 150,
        height: 200,
        backgroundColor: '#fff',
        padding: 8,
        margin: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },

    outercard: {
        margin: 10,
        marginLeft: 10,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'rgb(145, 41, 40)',
    },

    title: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'rgb(145, 41, 40)',
        top: 70,
        marginTop: 20,
        borderTopWidth: 2,
        borderTopColor: 'rgb(145,41, 40)'

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