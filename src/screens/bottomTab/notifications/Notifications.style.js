import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: 20,
        backgroundColor: '#a82c2c',
    },

    card: {
        borderColor: 'black',
        borderWidth: 1,
        paddingBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fef7d7',
        borderRadius: 10
    },

    heading: {
        color: 'black',
        fontSize: 27,
        marginBottom: 10,
        fontWeight: '600'
    },

    desc: {
        fontSize: 15,
        color: 'black'
    },

    link: {
        color: 'blue',
        fontSize: 13,
        marginTop: 7
    },
    date: {
        color: 'grey',
        textAlign: 'right',
        marginTop: 10
    }
})

export default styles;