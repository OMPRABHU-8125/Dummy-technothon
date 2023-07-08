import { StyleSheet } from "react-native";
import { black, blue, gray, maroon, white } from "../utils/color";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white,
    },

    lower: {
        fontSize: 15,
        color: blue,
        textDecorationLine: 'underline',
    },

    logo: {
        width: 100,
        height: 150,
        resizeMode: 'stretch'
    },

    icon: {
        width: 40,
        height: 40,
        position: 'absolute',
        right: 10,
    },

    text: {
        color: maroon,
        fontSize: 40,
        marginBottom: 80
    },


    input: {
        width: '80%',
        height: 40,
        borderColor: gray,
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 35,
        color: black,
        borderRadius: 10,
    },
    usericon: {
        position: 'absolute',
        left: 1,
        padding: 10
    },
    lockicon: {
        position: 'absolute',
        left: 1,
        padding: 10,
    },
    eyeicon: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 1,
        marginVertical: 5,
        marginHorizontal: 10,
    },

    button: {
        backgroundColor: black,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        elevation: 10,
    },
    buttonText: {
        color: white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;