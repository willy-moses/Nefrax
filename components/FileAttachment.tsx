import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { MediaTypeOptions } from "expo-image-picker";

const AttachFileScreen = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  const handleFileAttach = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setFiles((prevFiles) => [...prevFiles, result.assets[0]]);
      setShowDetails(true); // Show attached file details
    }
  };

  const toggleDetails = () => {
    setShowDetails((prevState) => !prevState);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.attachFileContainer}>
        <Button
          mode="contained"
          onPress={showDetails ? toggleDetails : handleFileAttach}
          style={styles.button}
        >
          {showDetails ? "Hide Attached" : "Attach File"}
        </Button>

        {showDetails && files.length > 0 && (
          <View style={styles.fileList}>
            {files.map((file, index) => (
              <Text key={index} style={styles.fileName}>
                {file.uri}
              </Text>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#00AEEF",
    alignItems: "center",
  },
  attachFileContainer: {
    
    
  },
  button: {
    marginTop: 10,
    backgroundColor: "#000",
  },
  fileList: {
    marginTop: 10,
  },
  fileName: {
    fontSize: 14,
    color: "#666",
  },
});

export default AttachFileScreen;
