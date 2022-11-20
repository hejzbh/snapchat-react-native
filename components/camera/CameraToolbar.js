import { View, Text } from "react-native";
import React from "react";
// Icons
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
// Components
import Button from "../Button";
const CameraToolbar = ({
  setCameraType,
  flashMode,
  setFlashMode,
  autoFocus,
  setAutoFocus,
}) => {
  const flipCamera = () =>
    setCameraType((activeCameraType) =>
      activeCameraType === "back" ? "front" : "back"
    );

  const toggleFlashMode = () =>
    setFlashMode((flashMode) => (flashMode === "on" ? "off" : "on"));

  const toggleAutoFocusMode = () => {
    setAutoFocus((autoFocus) => (autoFocus ? false : true));
  };

  return (
    <View className="flex items-center justify-center absolute right-3 top-[8%] bg-black/30 rounded-xl">
      {/** Flip camera */}
      <Button
        extraClass="p-2  bg-transparent mt-0 mb-1"
        onPress={flipCamera}
        Icon={
          <MaterialCommunityIcons name="rotate-360" size={26} color="white" />
        }
      />
      {/** Toggle flash */}
      <Button
        extraClass="p-2  bg-transparent mt-0 mb-2"
        onPress={toggleFlashMode}
        Icon={
          <Ionicons
            name={flashMode == "on" ? "flash" : "flash-off"}
            size={24}
            color="white"
          />
        }
      />
      {/** Toggle autofocus mode */}
      <Button
        extraClass="p-2  bg-transparent mt-0 mb-2"
        onPress={toggleAutoFocusMode}
        Icon={
          <MaterialIcons
            name={autoFocus ? "center-focus-strong" : "center-focus-weak"}
            size={24}
            color="white"
          />
        }
      />
    </View>
  );
};

export default CameraToolbar;
