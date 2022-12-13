import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import * as MediaLibary from "expo-media-library";
import { useEffect } from "react";
import { useState } from "react";
import Button from "../Button";
import { useAuth } from "../../redux/slices/auth";
import { useRoute } from "@react-navigation/native";
import { addDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";

const GalleryPicker = ({ onSubmit }) => {
  const { user } = useAuth();
  const { params } = useRoute();
  const [type, setType] = useState("Camera");
  const [assets, setAssets] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  useEffect(() => {
    if (type === "Camera") {
      getPhotosFromGallery();
    } else {
      getPhotosFromMemories();
    }
  }, [type]);

  const getPhotosFromGallery = async () => {
    const album = await MediaLibary.getAlbumAsync("All");
    const assets = await MediaLibary.getAssetsAsync({
      first: 100,
      album: album,
      sortBy: ["creationTime"],
      mediaType: ["photo", "video"],
    });

    setAssets(assets.assets);
  };

  const sendPhoto = async () => {
    await addDoc(doc(db, "chats", params.chatID, "messages"), {
      sender: user,
      content: selectedPhotos[0],
    });
  };

  const getPhotosFromMemories = async () => {};

  return (
    <View className="absolute left-0 top-0 bottom-0  w-full h-full flex-row flex justify-center items-center flex-1">
      <View
        style={{
          flex: 1,

          backgroundColor: "white",
          width: "80%",
          height: "80%",
        }}
      >
        <ScrollView
          contentContainerStyle={{
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            flexDirection: "row",
            paddingVertical: 10,
          }}
        >
          {assets?.map((asset) => {
            switch (asset.mediaType) {
              case "video":
                return <Text>Video</Text>;
                break;
              case "photo":
                const selected = selectedPhotos.some(
                  (photo) => photo.id === asset.id
                );
                return (
                  <TouchableOpacity
                    onPress={() =>
                      setSelectedPhotos((photos) => [...photos, asset])
                    }
                    className={`${selected ? "opacity-50" : "opacity-100"} `}
                  >
                    <Image
                      className="w-[100px] h-[100px]"
                      source={{ uri: asset.uri }}
                    />
                  </TouchableOpacity>
                );
                break;
            }
          })}
        </ScrollView>

        <Button
          disabled={selectedPhotos.length === 0}
          onPress={() => onSubmit(selectedPhotos)}
          title="Send"
        />
      </View>
    </View>
  );
};

export default GalleryPicker;
