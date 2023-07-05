import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    safeview: {
        flex: 1,
    },

    splashview: {
        backgroundColor: 'white',
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo: {
        resizeMode: 'center',
        height: 180,
        borderColor: '#000',
        padding: 10,

    },
    loading: {
        color: '#C0392B',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    loadingview: {
        backgroundColor: 'white',
        paddingBottom: 10,
    }
});

export default styles;