import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import * as COLORS from '../../utils/color';
import * as CONST from '../../utils/constant'

const windowWidth = Dimensions.get("window").width;
const windowheight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    card1: {
        width: windowWidth - 20,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        margin: 10,
        shadowColor: COLORS.shadowcolor,
        backgroundColor: COLORS.white,
        elevation: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: COLORS.maroon,
        marginBottom: 15
    },

    post: {
        color: COLORS.black,
        fontSize: 15,
        marginBottom: 15
    },

    name: {
        color: COLORS.gray
    },

    date: {
        color: COLORS.lightgray,
        textAlign: 'right'
    },

    image: {
        width: '100%',
        height: '20%',
        alignSelf: 'center',
        resizeMode: 'contain',
        marginHorizontal: 10
    },

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        position: 'relative'
    },

    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        color: COLORS.black,
        textAlign: 'right',
        marginRight: 20,
        fontFamily: 'sans-serif'
    },

    titleContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between'
    },

    readMore: {
        color: COLORS.lightgray,
        marginBottom: 10
    },

    icon: {
        marginTop: 10,
        marginRight: 9
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex - start',
        backgroundColor: 'white',
        padding: 30
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    commentInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    commentButton: {
        backgroundColor: COLORS.PRIMARY,
        color: 'white',
        textAlign: 'center',
        padding: 10,
        borderRadius: 5,
    },
    commentContainer: {
        alignContent: 'flex-start',
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
        elevation: 1
    },
    commentText: {
        fontSize: 16,
        color: 'black',
        marginLeft: 20
    },
    commentDate: {
        fontSize: 12,
        color: 'gray',
        alignSelf: 'flex-end'
    },

    commentTag: {
        fontSize: 12,
        color: 'gray',
    },

    selectedPostContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },

    commentHeading: {
        color: COLORS.black,
        fontSize: 20,
        marginBottom: 40
    },


    input: {
        width: '83%',
        height: 40,
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },

    button: {
        backgroundColor: COLORS.black,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 7,
        elevation: 10,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        justifyContent: 'center'
    },

    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'base-line'
    },

    button1: {
        backgroundColor: COLORS.black,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 10,
        elevation: 10,
    },

    likeContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default styles;