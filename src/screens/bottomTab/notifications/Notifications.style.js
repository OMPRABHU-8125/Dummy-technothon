import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: 20,
        //backgroundColor: '#a82c2c',
    },

    card: {
        shadowColor:'rgb(145, 41, 40)',
        elevation:10,
        borderRadius:10,
        padding:20,
    },

    heading: {
        //margin:20,
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