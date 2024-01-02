import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, FlatList } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';

const Venue = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [isImagePicking, setIsImagePicking] = useState(false);

  const handleImagePicker = async () => {
    try {
      console.log('Picking image...');
      setIsImagePicking(true);

      const documentPickerResponse = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      console.log('Selected image:', documentPickerResponse);
      setImages([...images, documentPickerResponse]);
    } catch (error) {
      console.error('Error picking image:', error);
    } finally {
      setIsImagePicking(false);
    }
  };
  const uploadImageToFirebase = async () => {
    try {
      const documentPickerResponse = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      const uploadTasks = documentPickerResponse.map(async (image) => {
        const fileName = image.name;
        const storageRef = storage().ref().child(`images/${fileName}`);

        const fileUri = image.uri;
        const response = await fetch(fileUri);
        const blob = await response.blob();

        await storageRef.put(blob);

        const downloadURL = await storageRef.getDownloadURL();
        return downloadURL;
      });

      const imageUrls = await Promise.all(uploadTasks);

      console.log('Image URLs:', imageUrls);

      setImageUrls(imageUrls);
    } catch (error) {
      console.log('Error uploading images:', error);
    }
  };


  const handleSubmit = async () => {
    if (isImagePicking) {
      console.log('Image selection is still ongoing. Please wait.');
      return;
    }

    console.log('Name:', name);
    console.log('Address:', address);

    const urls = await Promise.all(images.map(uploadImageToFirebase));
    console.log('Image URLs:', urls);
    setImageUrls(urls);
  };

  return (
    <ScrollView style={styles.container}>
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
      <FlatList
        data={imageUrls}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.imageContainer}>
            <Text style={styles.imageText}>Image {index + 1}</Text>
            <Image source={{ uri: item }} style={styles.image} />
          </View>
        )}
      />
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Submit
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
