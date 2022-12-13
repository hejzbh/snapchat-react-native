import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
// Utils
import getStranger from "../utils/getStranger";
import { useMemo } from "react";
import { useAuth } from "../redux/slices/auth";
// Components
import Messages from "../components/chat/Messages";
import ChatHeader from "../components/chat/ChatHeader";
import SendMessage from "../components/chat/SendMessage";
import SendPhoto from "../components/chat/GalleryPicker";
import GalleryPicker from "../components/modals/GalleryPicker";
// Firebase
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../firebase/config";

export const ChatScreen = () => {
  const { params } = useRoute();
  const [openGallery, setOpenGallery] = useState(false);
  const { id: chatID, users: chatUsers } = params.chat;
  const { user } = useAuth();

  const stranger = useMemo(
    () => getStranger(chatUsers, user),
    [chatUsers, user]
  );

  const sendImage = async (images) => {
    await addDoc(collection(db, "chats", chatID, "messages"), {
      sender: user,
      type: images.length > 1 ? "images" : "image",
      content:
        images.length > 1 ? images.map((image) => image.uri) : images[0].uri,
    });

    setOpenGallery(false);
  };

  return (
    <SafeAreaView className="w-full h-full bg-yellow-50 flex flex-col justify-between relative flex-1">
      <ChatHeader stranger={stranger} />
      <Messages chatID={chatID} />
      {/*<SendMessage chatID={chatID} />*/}
      <SendMessage chatID={chatID} setOpenGallery={setOpenGallery} />
      {/** Gallery modal */}
      {openGallery && <GalleryPicker onSubmit={sendImage} />}
    </SafeAreaView>
  );
};

export default ChatScreen;
