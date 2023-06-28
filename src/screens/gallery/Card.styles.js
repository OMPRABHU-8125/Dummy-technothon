import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#912929',
		borderRadius: 8,
		padding: 16,
		shadowColor: '#000',
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 2,
		height: 180,
		width: 180,
		marginHorizontal: 8,
		margin: 10
	},
	main: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fef7d7'
	},
	title: {
		fontSize: 25,
		fontWeight: 'bold',
		marginBottom: 8,
		color: 'white',
		fontFamily: 'arial'
	},
	description: {
		fontSize: 20,
		color: '#c1ccde',
		fontFamily: 'Poppins'
	}
});

export default styles;
