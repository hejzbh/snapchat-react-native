import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import messageListener from "../../hooks/messageListener";
import { SafeAreaView } from "react-native-safe-area-context";
import SendMessage from "./SendMessage";
import { useRef } from "react";

const Messages = ({ chatID }) => {
  const [messages, loading] = messageListener(chatID);
  const list = useRef();

  return (
    <SafeAreaView className="w-full p-2 h-full max-h-[90%] ">
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <ScrollView ref={list} alwaysBounceVertical={true}>
          {messages.map((message) => {
            switch (message.type) {
              case "images":
                return message.content.map((imgURL, i) => (
                  <Image
                    key={message.id}
                    source={{ uri: imgURL }}
                    style={{ width: 100, height: 100 }}
                  />
                ));
                break;

              case "image":
                return (
                  <Image
                    key={message.id}
                    source={{ uri: message.content }}
                    style={{ width: 100, height: 100 }}
                  />
                );
                break;

              case "msg":
                return <Text key={message.id}>{message.content}</Text>;
                break;

              default:
                return <Text>'ERROR'</Text>;
            }
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Messages;
