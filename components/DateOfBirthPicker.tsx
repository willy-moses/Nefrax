import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateOfBirthScreen = () => {
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <View style={styles.container}>
      {/* Date Picker */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          label="Date of Birth"
          mode="outlined"
          value={dob.toDateString()}
          style={styles.input}
          editable={false}
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDob(selectedDate);
          }}
        />
      )}
    </View>
  );
};

const { width } = Dimensions.get("window"); // Get the screen width dynamically

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // Align contents to the center horizontally
    backgroundColor: "#00AEEF",
    paddingHorizontal: 30,
  },
  input: {
 width: width * 0.7, // Adjust width to 90% of the screen
   // width: "100%",
  },
});

export default DateOfBirthScreen;
