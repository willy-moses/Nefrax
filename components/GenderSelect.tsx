import React, { useState } from "react";
import { View, StyleSheet , Dimensions} from "react-native";
import { Text, RadioButton, Button } from "react-native-paper";

const genders = ["Male", "Female", "Other"];

const GenderSelect = () => {
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false); // State to toggle visibility

  return (
    <View style={styles.container}>
      <Button
        mode="outlined"
        onPress={() => setIsVisible(!isVisible)} // Toggle visibility
        style={styles.toggleButton}
      >
        {isVisible ? "Hide Gender Selection" : "Select Gender"}
      </Button>

      {isVisible && (
        <View style={styles.genderContainer}>
          <Text style={styles.label}>Select Your Gender:</Text>
          <RadioButton.Group
            onValueChange={(gender) => setSelectedGender(gender)}
            value={selectedGender}
          >
            {genders.map((gender) => (
              <View key={gender} style={styles.radioButtonContainer}>
                <RadioButton value={gender} />
                <Text>{gender}</Text>
              </View>
            ))}
          </RadioButton.Group>
        </View>
      )}
    </View>
  );
};

const { width } = Dimensions.get("window"); // Get the screen width dynamically
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00AEEF",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButton: {
    width: width * 0.7,
    marginVertical: 10,
  },
  genderContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
});

export default GenderSelect;
