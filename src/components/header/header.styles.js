import { StyleSheet } from "react-native";
import { shadowcolor } from "../../utils/color";

const styles = StyleSheet.create({

    Homecontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        elevation: 15,
        shadowColor: 'rgb(145,41,40)',
        overflow: 'hidden',
        height: 45,
        paddingHorizontal: 10,
    },

    Container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 15,
        shadowColor: 'rgb(145,41,40)',
        overflow: 'hidden',
        height: 55,
    },

    icon: {
        position: 'absolute',
        right: 20,
    },

    tabIcon: {
        position: 'absolute',
        left: 10
    },

    logintext:{
        color:shadowcolor
    },

    // rightTitle: {
    //     color: 'rgb(145,41,40)',
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     marginHorizontal: 10
    // },

    TabTitle: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginHorizontal: 10,
        position: 'absolute',
        alignContent: 'center'
    },
});

export default styles;