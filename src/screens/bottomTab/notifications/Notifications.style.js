import { StyleSheet } from 'react-native'
import {  black, blue, desctext, shadowcolor, white } from '../../utils/color';
 import { cartborderradius, elevationsize } from '../../utils/cart';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: 20,
    },

    card: {
        shadowColor:shadowcolor,
        backgroundColor:white,
        elevation:elevationsize,
        borderRadius:cartborderradius,
        padding:10,
    },

    heading: {
        color:black,
        fontSize: 27,
        marginBottom: 10,
        fontWeight: '600'
    },

    desc: {
        fontSize: 15,
        color:black
    },

    link: {
        color:blue,
        fontSize: 13,
        marginTop: 7
    },
    date: {
        color: desctext,
        textAlign: 'right',
        marginTop: 10
    }
})

export default styles;