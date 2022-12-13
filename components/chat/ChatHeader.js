import { View, Text, Image } from "react-native";
import React from "react";

const ChatHeader = ({ stranger }) => {
  return (
    <View className="w-full flex items-center flex-row px-4 py-2 border-b-2 border-[gray]/30">
      <Image
        className="w-[40px] h-[40px]  mr-2"
        source={{ uri: stranger.bitmoji.url }}
      />
      <Text className="text-lg font-bold ">{stranger.first_name}</Text>
    </View>
  );
};

export default ChatHeader;
