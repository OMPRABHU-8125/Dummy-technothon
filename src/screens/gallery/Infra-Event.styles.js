import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	body: {
		backgroundColor: '#fef7d7',
		flex: 1
	},
	photoItem: {
		width: 20,
		height: 100,
		margin: 5
	},
	text: {
		backgroundColor: '#912929',
		padding: 10,
		borderRadius: 5,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		fontFamily: 'arial',
		fontWeight: 'bold',
		marginLeft: 15,
		marginRight: 67
	},

	image: {
		width: 300,
		height: 250,
		resizeMode: 'cover',
		margin: 20
	}
});

export default styles;
