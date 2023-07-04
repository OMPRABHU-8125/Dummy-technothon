import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "lightgray",
        justifyContent: "center",
        alignItems: "center",
    },

    icon: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },

    main: {
        padding: 30,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    title: {
        fontSize: 20,
        color: 'black',
        marginLeft: 20
    },

    card: {
        padding: 20,
    },

    heading: {
        color: 'black',
        fontSize: 25
    },

    bottomText: {
        color: 'black',
        fontSize: 15,
        marginTop: 5
    },

    line: {
        borderBottomColor: "black",
        borderBottomWidth: 1,
    },
})

export default styles;