import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
// Componenst
import Camera from "../components/camera/Camera";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";
// Utils
import getAllPermisions from "../utils/getAllPermisions";

export const HomeScreen = () => {
  const isCameraLoaded = useIsFocused();

  useEffect(() => {
    getAllPermisions();
  }, []);

  return (
    <SafeAreaView className="relative h-full">
      <Header />
      {isCameraLoaded && <Camera />}
      <BottomNavigation />
    </SafeAreaView>
  );
};
