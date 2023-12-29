import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';

const Venue = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [images, setImages] = useState([]); // Store selected images

  const handleImagePicker = () => {
    const options = {
      title: 'Select Images',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // Add the selected image to the images array
        setImages([...images, response]);
      }
    });
  };

  const handleSubmit = () => {
    // Handle the submission, e.g., send the name, address, and images to a server
    console.log('Name:', name);
    console.log('Address:', address);
    console.log('Selected Images:', images);
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
      {images.map((image, index) => (
        <Text key={index}>Image {index + 1}: {image.fileName}</Text>
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
});

export default Venue;

