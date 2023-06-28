import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from './Infra-Event.styles.js';

const Event = () => {
	const [ images, setImages ] = useState([]);

	useEffect(() => {
		const fetchPhotos = async () => {
			try {
				const snapshot = await firestore().collection('Images').where('module', '==', 'event').get();
				if (!snapshot.empty) {
					const photoData = snapshot.docs.map((doc) => doc.data());
					setImages(photoData);
					console.log('Images:', photoData);
				} else {
					console.log('No documents found in "Images" collection.');
				}
			} catch (error) {
				console.error('Error fetching photos:', error);
			}
		};

		fetchPhotos();
	}, []);

	const renderPhotoItem = ({ item }) => (
		<View>
			<TouchableOpacity onPress={() => Linking.openURL(item.imageURL)}>
				<Image source={{ uri: item.imageURL }} style={styles.image} />
			</TouchableOpacity>
			<Text style={styles.text}>{item.imageText}</Text>
		</View>
	);

	return (
		<View style={styles.body}>
			{images.length === 0 ? (
				<Text style={styles.text}>No photos available.</Text>
			) : (
				<FlatList data={images} renderItem={renderPhotoItem} keyExtractor={(item) => item.imageId} />
			)}
		</View>
	);
};

export default Event;
