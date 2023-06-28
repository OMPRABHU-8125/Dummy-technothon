import React, { useEffect } from 'react';
import { View, TouchableOpacity, TouchableHighlight, Text, StyleSheet } from 'react-native';
import Card from './Card';
import Infra from './Infra';
import Event from './Event';
// import Style from './gallery/Style';
import { useNavigation } from '@react-navigation/native';
const Gallery = () => {
	const navigation = useNavigation();

	useEffect(() => {
		console.log('Hello');
	}, []);
	return (
		<View
			style={{
				flexDirection: 'row',
				flex: 1,
				backgroundColor: '#fef7d7',
				justifyContent: 'center'
			}}
		>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('Infra');
				}}
				style={{ width: 180, height: 180, marginHorizontal: 10 }}
			>
				<Card title="Infrastructure" description="Click here for viewing VES Infrastructure Images" />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('Event')} style={{ width: 180, height: 180 }}>
				<Card title="Event" description="Click here for viewing Event Images" />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	back: {
		backgroundColor: 'blue',
		padding: 10,
		borderRadius: 5,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
export default Gallery;
