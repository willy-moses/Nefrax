import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-paper";
import {

  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useWindowDimensions } from "react-native";
import CustomAlert from "./CustomAlert";
import { auth } from "../firebaseConfig";

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignUp"
>;

const SignInScreen: React.FC = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alertData, setAlertData] = useState({ title: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const showAlert = (title: string, message: string) => {
    setAlertData({ title, message });
    setAlertVisible(true);
  };

  const handleSignIn = async () => {
    if (validateInputs(email, password)) {
      setLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        if (user.emailVerified) {
         // showAlert("Success", "Login successful");
         navigation.navigate('Home'); // Navigate to the "Details" screen
        } else {
          setModalVisible(true);
        }
      } catch (error) {
        let errorMessage = "An error occurred. Please try again.";
        if (error instanceof Error) {
          switch (error.message) {
            case "Firebase: Error (auth/invalid-email).":
              errorMessage = "Invalid email address.";
              break;
            case "Firebase: Error (auth/user-not-found).":
              errorMessage = "User not found.";
              break;
            case "Firebase: Error (auth/wrong-password).":
              errorMessage = "Incorrect password.";
              break;
            default:
              break;
          }
        } else {
          console.error("Unexpected error:", error);
        }
        showAlert("Login Failed", errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  const validateInputs = (email: string, password: string): boolean => {
    let valid = true;
    let newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const resendVerificationEmail = async () => {
    setModalVisible(false);
    const user = auth.currentUser;
    if (user) {
      try {
        await sendEmailVerification(user);
        showAlert("Verification Email Sent", "Please check your inbox.");
      } catch (error) {
        console.error("Error sending verification email:", error);
        showAlert("Error", "Failed to send verification email.");
      }
    } else {
      showAlert("Error", "No user is currently signed in.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.flex}
    >
      <ScrollView
        contentContainerStyle={[styles.scrollContainer, { paddingBottom: height * 0.05 }]}
      >
        <View style={[styles.container, { paddingTop: height * 0.1 }]}>
          <View style={styles.imageContainer}>
            <View style={styles.whitePlaceholder} />
            <View style={styles.blackPlaceholder} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { fontSize: width * 0.08 }]}>Thank You For</Text>
            <Text style={[styles.subtitle, { fontSize: width * 0.08 }]}>Choosing Us!</Text>
          </View>
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="email-outline" size={25} color="#00AEEF" style={styles.icon} />
            <TextInput
              mode="flat"
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.input}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
            />
          </View>
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          <View style={styles.inputWrapper}>
            <MaterialIcons name="lock-outline" size={25} color="#00AEEF" style={styles.icon} />
            <TextInput
              mode="flat"
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.input}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.iconContainer}
            >
              <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#00AEEF"
              />
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Email Verification Required</Text>
                <Text style={styles.modalText}>
                  Please verify your email before logging in.
                </Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton2}
                  onPress={resendVerificationEmail}
                >
                  <Text style={styles.modalButtonText}>Resend Email</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSignIn}
            style={[styles.signUpButton, loading && styles.buttonDisabled]}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#333" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>
          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>Or Sign Up</Text>
            <View style={styles.line} />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={styles.signInButton}
          >
            <Text style={styles.signInText}>Sign Up</Text>
          </TouchableOpacity>
          {alertVisible && (
            <CustomAlert
              title={alertData.title}
              message={alertData.message}
              visible={alertVisible}
              onClose={() => setAlertVisible(false)}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#00AEEF",
  },
  container: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: "5%",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontWeight: "600",
    color: "#333",
  },
  subtitle: {
    fontWeight: "600",
    color: "#333",
    marginTop: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "80%",
    backgroundColor: "#FFF",
    borderRadius: 30,
    paddingLeft: 50,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "transparent",
    borderRadius: 30,
  },
  icon: {
    position: "absolute",
    left: 15,
  },
  iconContainer: {
    position: "absolute",
    right: 15,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  signUpButton: {
    width: "60%",
    height: 50,
    borderRadius: 30,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signInButton: {
    width: "40%",
    height: 50,
    borderRadius: 30,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  signInText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  buttonDisabled: {
    backgroundColor: "#d3d3d3",
  },
  forgotPassword: { 
    alignSelf: "flex-end", 
    color: "#fff",
     marginBottom: 10
     },

  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    width: "80%",
  },
  orText: {
    color: "#FFF",
    marginHorizontal: 10,
    fontWeight: "600",
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: "#FFF",
  },
  imageContainer: {
    position: "relative",
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  whitePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFF",
    elevation: 5,
  },
  blackPlaceholder: {
    position: "absolute",
    backgroundColor: "#000",
    borderRadius: 50,
    width: 90,
    height: 90,
    top: 20,
    left: -15,
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    paddingLeft: 55,
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
  },
  modalButton2: {
    backgroundColor: "#00AEEF",
    width: "80%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginVertical: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
export default SignInScreen;
