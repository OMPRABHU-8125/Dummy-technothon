import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from './PhotoGallery.styles';

const ImageGrid = () => {
    const [imageArrays, setImageArrays] = useState([]);

    useEffect(() => {
        // Fetch image arrays from Firebase
        const fetchImageArrays = async () => {
            try {
                const snapshot = await firestore().collection('Images').get();
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    title: doc.data().imageTitle,
                    images: doc.data().imageURL,
                }));

                setImageArrays(data);
            } catch (error) {
                console.log('Error fetching image arrays:', error);
            }
        };

        fetchImageArrays();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.imageContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <FlatList
                data={item.images}
                renderItem={({ item }) => (
                    <Image
                        source={{ uri: item }}
                        style={styles.image}
                        resizeMode='cover'
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                contentContainerStyle={styles.container}
            />
        </View>
    );

    return (
        <View style={styles.main}>
            <FlatList
                data={imageArrays}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default ImageGrid;