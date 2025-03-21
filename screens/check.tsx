import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../firebaseConfig'; // Import Firestore
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore methods

const TestPage: React.FC = () => {

  // Image source from assets
  const imageSource = require('../assets/images/content.jpg');

  // Function to store data in Firestore
  const storeImageData = async () => {
    try {
      // Add a document with the image URL (or other data) to Firestore
      await addDoc(collection(db, 'images'), {
        imageUrl: imageSource,
        createdAt: new Date(),
      });
      alert('Image data stored successfully!');
    } catch (error) {
      console.error('Error storing image data:', error);
      alert('Error storing image data!');
    }
  };

  useEffect(() => {
    // Any initialization or setup can be done here if needed
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Test Page</Text>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.info}>This is a test page displaying an image from the assets folder.</Text>
      <TouchableOpacity onPress={storeImageData} style={styles.button}>
        <Text style={styles.buttonText}>Store Image Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00AEEF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TestPage;
