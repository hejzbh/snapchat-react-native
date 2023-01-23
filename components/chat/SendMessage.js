import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as MediaLibary from "expo-media-library";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useAuth } from "../../redux/slices/auth";
import { useState } from "react";

import Button from "../Button";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
// Icons
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const SendMessage = ({ chatID, setOpenGallery }) => {
  const { user } = useAuth();
  const [msg, setMsg] = useState("");

  const sendMessage = async () => {
    await addDoc(collection(db, "chats", chatID, "messages"), {
      sender: user,
      type: "msg",
      content: msg,
    });
  };

  const getPhotoFromGallery = async () => {
    const album = await MediaLibary.getAlbumAsync("All");
    const allPhotos = await MediaLibary.getAssetsAsync({
      first: 100,
      album: album,
      sortBy: ["creationTime"],
      mediaType: ["photo", "video"],
    });
  };

  return (
    <View className="absolute left-0 bg-white right-0 bottom-0 bg-tranparent p-2 border-t-[1px] border-[gray] flex flex-row justify-between">
      <KeyboardAvoidingView behavior="position" className="w-[88%]">
        {/** Input */}
        <TextInput
          className="bg-[#E9EDEF] rounded-full p-1 px-3"
          value={msg}
          onChangeText={(text) => setMsg(text)}
          onSubmitEditing={sendMessage}
        />
      </KeyboardAvoidingView>
      {/** SEND  */}
      <Button
        onPress={() => {
          setOpenGallery((open) => !open);
        }}
        extraClass="mt-0 p-3 w-[10%] bg-[#E9EDEF]"
        Icon={<MaterialIcons name="photo-library" size={15} color="black" />}
      />
    </View>
  );
};

export default SendMessage;
