import React, { useState } from "react";
import { useEffect } from "react";
// NAVIGATION
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
// Screens
import { HomeScreen } from "../screens/Home";
import { LoginScreen } from "../screens/Login";
import { PreviewPage } from "../screens/Preview";
import { Friends } from "../screens/Friends";
// Redux
import { useAuth } from "../redux/slices/auth";
import { useDispatch } from "react-redux";
// Utils
import checkAuthentication from "../utils/checkAuthentication";
import LoadAllNotifications from "../utils/LoadAllNotifications";
import getUserCollections from "../utils/getUserCollections";
// Splash screen
import * as SplashScreen from "expo-splash-screen";
const Stack = createStackNavigator();

export const ScreenNavigator = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [allReady, setAllReady] = useState(false);

  useEffect(() => {
    checkAuthentication(dispatch, setAllReady);
  }, []);

  useEffect(() => {
    if (!user?.uid) return;
    LoadAllNotifications(user.uid);
    getUserCollections(dispatch, user);
  }, [user?.uid]);

  useEffect(() => {
    if (allReady) SplashScreen.hideAsync();
  }, [allReady]);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        {allReady && (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              gestureDirection: "vertical",
            }}
          >
            {user ? (
              <>
                <Stack.Group>
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Preview" component={PreviewPage} />
                </Stack.Group>
                {/** Modals */}
                <Stack.Group screenOptions={{ presentation: "modal" }}>
                  <Stack.Screen name="Friends" component={Friends} />
                </Stack.Group>
              </>
            ) : (
              <Stack.Group>
                <Stack.Screen name="Login" component={LoginScreen} />
              </Stack.Group>
            )}
          </Stack.Navigator>
        )}
      </SafeAreaProvider>
    </NavigationContainer>
  );
};
