import React, { useState } from "react";
import { View, StyleSheet,Dimensions } from "react-native";
import { Text, Button, Checkbox } from "react-native-paper";

const professions = ["Doctor", "Engineer", "Teacher", "Artist", "Developer", "Designer"];

const SelectProfessionScreen = () => {
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);
  const [showProfessions, setShowProfessions] = useState(false);

  const toggleProfession = (profession: string) => {
    setSelectedProfessions((prev) =>
      prev.includes(profession) ? prev.filter((p) => p !== profession) : [...prev, profession]
    );
  };

  return (
    <View style={styles.container}>
      <Button
        mode="outlined"
        onPress={() => setShowProfessions(!showProfessions)}
        style={styles.toggleButton}
      >
        {showProfessions ? "Hide Professions" : "Select Professions"}
      </Button>

      {showProfessions && (
        <View style={styles.professionContainer}>
          <Text style={styles.label}>Select Your Profession(s):</Text>
          {professions.map((profession) => (
            <View key={profession} style={styles.checkboxContainer}>
              <Checkbox
                status={selectedProfessions.includes(profession) ? "checked" : "unchecked"}
                onPress={() => toggleProfession(profession)}
              />
              <Text>{profession}</Text>
            </View>
          ))}
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
    
  },
  professionContainer: {
    backgroundColor: "#fff",
    
    borderRadius: 10,
    
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
});

export default SelectProfessionScreen;
