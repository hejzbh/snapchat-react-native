import React, { Fragment } from "react";
import { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
// Screens
import { HomeScreen } from "../screens/Home";
import { LoginScreen } from "../screens/Login";
import { PreviewPage } from "../screens/Preview";
// Redux
import { useAuth } from "../redux/slices/auth";
import { useDispatch } from "react-redux";
// Utils
import checkAuthentication from "../utils/checkAuthentication";
const Stack = createStackNavigator();

export const ScreenNavigator = () => {
  const { user } = useAuth();
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
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Preview" component={PreviewPage} />
            </>
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};
