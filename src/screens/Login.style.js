import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(255,259,400)'
    },

    lower: {
        fontSize: 15,
        color: 'blue',
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
        color: '#000'
    },

    text: {
        color: 'rgb(145, 41, 40)',
        fontSize: 40,
        marginBottom: 80
    },

    bottomText: {
        color: '#606060',
        fontSize: 15,
        marginTop: 20
    },

    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: '#000',
        borderRadius: 10
    },

    button: {
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        elevation: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;