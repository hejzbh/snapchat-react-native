import { View, Text } from "react-native";
import React from "react";
import Button from "../Button";
import { SafeAreaView } from "react-native-safe-area-context";
const GalleryPicker = ({ chatID }) => {
  return (
    <SafeAreaView>
      <Button title="Gallery" extraClass="my-0 mt-0" />
    </SafeAreaView>
  );
};

export default GalleryPicker;
