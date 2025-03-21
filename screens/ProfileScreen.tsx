import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button, Text, Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ProfileImage from "../components/ProfileImage";
import DateOfBirthPicker from "../components/DateOfBirthPicker";
import FileAttachment from "../components/FileAttachment";
import GenderSelect from "../components/GenderSelect";
import ProfessionsSelect from "../components/ProfessionsSelect";
import NamesScreen from "../components/NamesScreen";

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();

  const [profileData, setProfileData] = useState({
    name: "",
    dob: "",
    gender: "",
    profession: "",
    file: null,
  });

  const handleSaveChanges = () => {
    console.log("Saving profile data:", profileData);
    // Add Firestore update logic here
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView style={styles.container}>
        {/* AppBar with Back Button */}
        <Appbar.Header style={styles.appBar}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Edit Profile" />
        </Appbar.Header>

        {/* Profile Image */}
        <View style={styles.section}>
          <ProfileImage />
        </View>

        {/* User Details Form */}
        <View style={styles.section}>
          <NamesScreen />
        </View>

        {/* Date of Birth Picker */}
        <View style={styles.section}>
          <DateOfBirthPicker />
        </View>

        {/* Gender Select */}
        <View style={styles.section}>
          <GenderSelect />
        </View>

        {/* Professions Select */}
        <View style={styles.section}>
          <ProfessionsSelect />
        </View>

        {/* Attach Files */}
        <View style={styles.section}>
          <FileAttachment />
        </View>

        {/* Save Changes Button */}
        <Button
          mode="contained"
          onPress={handleSaveChanges}
          style={styles.saveButton}
        >
          Save Changes
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00AEEF",
  },
  appBar: {
    backgroundColor: "#00AEEF",
  },
  section: {
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  saveButton: {
    backgroundColor: "#000",
    alignSelf: "center",
    
    marginBottom: 20,
  },
});

export default ProfileScreen;
