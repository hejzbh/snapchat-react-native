import { useEffect, useState } from "react";
import { View } from "react-native";
// Libary
import * as MediaLibary from "expo-media-library";
// Icons
import { Ionicons } from "@expo/vector-icons";
// Components
import Button from "../Button";
// Utils
import getUserGalleryPermissions from "../../utils/getUserGalleryPermissions";

const PreviewImageOptions = ({ image }) => {
  const [status, requestPermission] = MediaLibary.usePermissions();
  const [pictureSaved, setPictureSaved] = useState(false);

  useEffect(() => {
    if (!status?.granted) {
      getUserGalleryPermissions();
    }
  }, [status?.granted]);

  const saveImageToGalery = async () => {
    await MediaLibary.saveToLibraryAsync(image).then(() => {
      setPictureSaved(true);
    });
  };
  console.log(status);

  return (
    <View className="absolute bottom-5 left-5">
      <Button
        extraClass="p-1 bg-transparent"
        disabled={pictureSaved || !status?.granted}
        onPress={saveImageToGalery}
        Icon={
          <Ionicons
            name={pictureSaved ? "save" : "save-outline"}
            size={24}
            color="white"
          />
        }
      />
    </View>
  );
};

export default PreviewImageOptions;
