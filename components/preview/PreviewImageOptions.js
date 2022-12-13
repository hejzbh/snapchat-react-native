import { useEffect, useState } from "react";
import { View } from "react-native";
// Libary
import * as MediaLibary from "expo-media-library";
// Icons
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// Components
import Button from "../Button";
// Utils
import getUserGalleryPermissions from "../../utils/getUserGalleryPermissions";

const PreviewImageOptions = ({
  image,
  snapExpiresTime,
  setSnapExpiresTime,
}) => {
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

  const increaseSnapTime = () => {
    setSnapExpiresTime((time) =>
      time === "not-expiration" ? 1 : time === 10 ? "not-expiration" : time + 1
    );
  };

  return (
    <View className="absolute bottom-5 left-5 flex flex-row items-center">
      <Button
        extraClass="p-1 bg-black/30"
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
      <Button
        extraClass="p-1 bg-black/30 mb-0 ml-4"
        onPress={increaseSnapTime}
        title={
          snapExpiresTime !== "not-expiration"
            ? `${snapExpiresTime}s`
            : snapExpiresTime
        }
        Icon={<MaterialIcons name="timer" size={26} color="white" />}
      />
    </View>
  );
};

export default PreviewImageOptions;
