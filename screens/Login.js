import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
// Components
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
// FIREBASE
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/config";
// UTILS
import formatFirebaseError from "../utils/formatFirebaseError";
import SendDataToFirestore from "../utils/SendDataToFirestore";
import { useAuth } from "../redux/slices/auth";

export const LoginScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState({
    login: true,
    register: false,
  });
  const [error, setError] = useState(null);
  const { navigate } = useNavigation();

  const resetError = () => setError(null);
  const switchForms = () =>
    setShowForm((showForm) => {
      return {
        login: showForm.login ? false : true,
        register: showForm.register ? false : true,
      };
    });

  useEffect(() => {
    // When we switching forms from login to register or reversed
    if (error) resetError();
  }, [showForm]);

  const login = async (credentials) => {
    try {
      const { email, password } = credentials;

      const tryToLogin = await signInWithEmailAndPassword(auth, email, password)
        .then((createdUser) => {
          // Navigate user to HomeScreen and hide current Login screen because he is available
          // only for unauthenticated users
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        })
        .catch((err) => {
          throw new Error(err);
        })
        .finally((_) => {
          resetError();
        });
    } catch (error) {
      setError(formatFirebaseError(error.message));
    }
  };

  const register = async (credentials) => {
    try {
      const { email, password } = credentials;

      const createUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
        .then(async (res) => {
          // Send user data to firestore
          delete credentials.password; // we dont want to store password in firestore
          // PATH - ID - DATA
          await SendDataToFirestore("users", res.user.uid, {
            ...credentials,
            id: res.user.uid,
          });
          // Go to homepage
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error) {
      setError(formatFirebaseError(error.message));
    }
  };

  return (
    <SafeAreaView>
      <View className="bg-white/5 w-full min-h-full flex items-center justify-center flex-col">
        {error && (
          <Text className="mb-10" style={{ color: "red" }}>
            {error}
          </Text>
        )}
        {/** Forms */}
        {showForm.login ? (
          <LoginForm switchForms={switchForms} onSubmit={login} />
        ) : (
          <RegisterForm switchForms={switchForms} onSubmit={register} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
