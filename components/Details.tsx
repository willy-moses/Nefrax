import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

const Details = () => {
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
          phone: Yup.string()
            .matches(/^\d{10}$/, "Must be a valid 10-digit phone number")
            .required("Phone is required"),
        })}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              label="Username"
              mode="outlined"
              value={values.username}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              style={styles.input}
              error={!!(touched.username && errors.username)}
            />
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
            <TextInput
              label="Phone Number"
              mode="outlined"
              value={values.phone}
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              keyboardType="phone-pad"
              style={styles.input}
              error={!!(touched.phone && errors.phone)}
            />
            <Button mode="contained" onPress={() => handleSubmit()} style={styles.submitButton}>
              Save Changes
            </Button>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#00AEEF",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: "#000",
  },
});

export default Details;
