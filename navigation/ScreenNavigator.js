import React from "react";
import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
// Screens
import { HomeScreen } from "../screens/Home";
import { LoginScreen } from "../screens/Login";
// Redux
import { useAuth } from "../redux/slices/auth";
import { useDispatch } from "react-redux";
// Utils
import checkAuthentication from "../utils/checkAuthentication";
const Stack = createNativeStackNavigator();

export const ScreenNavigator = () => {
  const { user } = useAuth();

  useEffect(() => {
    console.log(user);
    alert("IDE AGS");
  }, [user]);
  const dispatch = useDispatch();

  useEffect(() => {
    checkAuthentication(dispatch);
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: "horizontal",
          }}
        >
          {user ? (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};
