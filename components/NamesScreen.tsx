import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Dimensions, View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import PhoneInput from "react-native-phone-number-input";
import { Formik } from "formik";
import * as Yup from "yup";

interface NamesScreenProps {
  setProfileData: (data: Record<string, any>) => void;
}

const NamesScreen: React.FC<NamesScreenProps> = ({ setProfileData }) => {
  const [countryCode, setCountryCode] = useState("+267"); // Initial country code (Botswana)
  const [countryISOCode, setCountryISOCode] = useState("BW"); // Initial ISO code (Botswana)

  // Simulate fetching user's country code, set default to "+267" and "BW" if unavailable
  useEffect(() => {
    const fetchCountryCode = async () => {
      const userCountryCode = "+267"; // Replace with dynamic fetching logic
      const userCountryISOCode = "BW"; // Replace with dynamic fetching logic
      setCountryCode(userCountryCode);
      setCountryISOCode(userCountryISOCode);
    };

    fetchCountryCode();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={{
          username: "",
          email: "",
          phone: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string().required("Username is required"),
          email: Yup.string().email("Invalid email").required("Email is required"),
          phone: Yup.string().required("Phone is required"),
        })}
        onSubmit={(values) => {
          const fullPhoneNumber = `${countryCode}${values.phone}`;
          setProfileData((prev) => ({ ...prev, phone: fullPhoneNumber }));
        }}
      >
        {({ handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                label="Username"
                mode="outlined"
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                style={styles.input}
                error={!!(touched.username && errors.username)}
              />
              {touched.username && errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                label="Email"
                mode="outlined"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                keyboardType="email-address"
                style={styles.input}
                error={!!(touched.email && errors.email)}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <PhoneInput
                defaultValue={values.phone}
                defaultCode={countryISOCode} // Pass the two-letter country code here (e.g., "BW" for Botswana)
                layout="first"
                onChangeFormattedText={(text) => {
                  setFieldValue("phone", text);
                }}
                onChangeCountry={(country) => setCountryCode(`+${country.callingCode}`)}
                containerStyle={styles.phoneInput}
                textContainerStyle={styles.phoneTextInput}
                withShadow
              />
              {touched.phone && errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}
            </View>
          </>
        )}
      </Formik>
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
  inputContainer: {
    width: width * 0.7,
    marginBottom: 10,
  },
  input: {
    width: "100%",
  },
  phoneInput: {
    width: "100%",
    height: 55,
    borderRadius: 5,
  },
  phoneTextInput: {
    paddingVertical: 0,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});

export default NamesScreen;
