
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 25,
        paddingTop: 20,
    },

    card: {
        height: 50,
        width: '95%',
        backgroundColor: 'rgb(145,41,40)',
        // backgroundColor:'white',
        borderRadius: 25,
    },

    label: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
        paddingVertical: 10,
    },

    header: {
        height: 40,
        marginBottom: 10, // Increase marginBottom for spacing
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    //   header:{
    //     height:40,
    //     marginBottom:1,
    //     borderBottomColor:'black',
    //     borderBottomWidth:1,
    //   }
});
