import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
// Componenst
import Camera from "../components/camera/Camera";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";
export const HomeScreen = () => {
  const isCameraLoaded = useIsFocused();

  return (
    <SafeAreaView className="relative h-full">
      <Header />
      {isCameraLoaded && <Camera />}
      <BottomNavigation />
    </SafeAreaView>
  );
};
