import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        alignItems: 'center',
    },
    image: {
        width: 238,
        height: 300,
        marginBottom: 20,
    },
    coloredSection1: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        marginVertical: 10,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 5,
        color: '#700000',
    },
    section: {
        alignSelf: 'stretch',
        marginVertical: 10,
    },
    subHeading: {
       fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#700000',
    },
    contactText: {
        fontSize: 20,
        marginBottom: 5,
        color: '#0000ff',
        textDecorationLine: 'underline',
    },
    clickedText: {
        color: '#ff0000',
    },
    academicYear: {
        color: '#0000ff',
        textDecorationLine: 'underline',
        marginBottom: 8,
        fontSize: 20,
    },
    aboutText: {
        color: '#000000',
        fontSize: 16,
        marginBottom: 10,
        
      },
});

export default styles;