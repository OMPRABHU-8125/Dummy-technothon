import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';

const Venue = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleImagePicker = async () => {
    try {
      const documentPickerResponse = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      // Add the selected image to the images state
      setImages([...images, documentPickerResponse]);
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const uploadImageToFirebase = async (image) => {
    const { uri, name } = image;

    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = storage().ref(`images/${name}`);
    await storageRef.put(blob);

    // Get the download URL
    const url = await storageRef.getDownloadURL();
    return url;
  };

  const handleSubmit = async () => {
    console.log('Name:', name);
    console.log('Address:', address);

    // Upload images to Firebase Storage and get download URLs
    const urls = await Promise.all(images.map(uploadImageToFirebase));
    console.log('Image URLs:', urls);

    // Set the image URLs state for rendering in the component
    setImageUrls(urls);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      <TextInput
        label="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleImagePicker} style={styles.button}>
        Select Images
      </Button>
      {imageUrls.map((imageUrl, index) => (
        <View key={index} style={styles.imageContainer}>
          <Text style={styles.imageText}>Image {index + 1}</Text>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
      ))}
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  imageContainer: {
    marginTop: 16,
  },
  imageText: {
    marginBottom: 8,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
});

export default Venue;
