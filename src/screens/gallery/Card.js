import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './Card.styles';

const Card = ({ title, description }) => {
	return (
		<View style={styles.main}>
			<View style={styles.main}>
				<View style={styles.card}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.description}>{description}</Text>
				</View>
			</View>
		</View>
	);
};

export default Card;
