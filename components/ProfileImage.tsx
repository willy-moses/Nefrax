import React, { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Text } from "react-native-paper";
import { storage, db } from "../firebaseConfig"; // Ensure the db and storage are imported correctly
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Correct storage imports
import { doc, updateDoc } from 'firebase/firestore'; // Updated imports for Firestore
import { v4 as uuidv4 } from "uuid"; // For generating unique file names

const ProfileImage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImageToFirebase = async (uri: string) => {
    try {
      // Fetch image data from URI
      const response = await fetch(uri);
      const blob = await response.blob();

      // Generate a unique file name for the image
      const filename = uuidv4(); 

      // Create a reference to the storage location
      const storageRef = ref(storage, `profile_images/${filename}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);  // Upload using the reference

      setUploading(true);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Monitor upload progress (optional)
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload failed: ", error);
          setUploading(false);
        },
        async () => {
          // Get the download URL once the upload is complete
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at: ", downloadURL);

          // Save the download URL in Firestore under the user's document
          const userId = "currentUserId"; // Replace with actual user ID (e.g., from authentication)
          const userDocRef = doc(db, "profile", userId); // Access the user document
          await updateDoc(userDocRef, {
            profileImage: downloadURL,
          });

          setUploading(false);
          alert("Image uploaded successfully!");
        }
      );
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
      alert("Error uploading image!");
    }
  };

  const handleSaveProfileImage = async () => {
    if (image) {
      await uploadImageToFirebase(image);
    } else {
      alert("Please select an image first.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Profile Image</Text>
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        <Image
          source={image ? { uri: image } : require("../assets/images/content.jpg")}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      {uploading ? (
        <Text style={styles.uploadingText}>Uploading...</Text>
      ) : (
        <TouchableOpacity onPress={handleSaveProfileImage} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Profile Image</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  imageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
  },
  uploadingText: {
    fontSize: 14,
    color: "#FF4500",
    marginTop: 10,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: "#00AEEF",
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ProfileImage;
