import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import messageListener from "../../hooks/messageListener";
import { SafeAreaView } from "react-native-safe-area-context";
import SendMessage from "./SendMessage";
import { useRef } from "react";
import { useAuth } from "../../redux/slices/auth";
import { FlatList } from "react-native";
import { useEffect } from "react";

const Messages = ({ chatID }) => {
  const [messages, loading] = messageListener(chatID);
  const lastMessageRef = useRef();
  const { user } = useAuth();

  return (
    <SafeAreaView className="h-full">
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS ? "padding" : "height"}
          keyboardVerticalOffset={10}
        >
          <FlatList
            data={messages}
            keyExtractor={(msg) => msg.id}
            renderItem={({ item: message }) => {
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
                  return (
                    <Text
                      key={message.id}
                      style={{
                        marginLeft:
                          message.sender.id === user.id ? "auto" : "0",
                        backgroundColor:
                          message.sender.id === user.id
                            ? "yellowgreen"
                            : "green",
                        padding: 10,
                        marginBottom: 5,
                        color: "white",
                      }}
                    >
                      {message.content}
                    </Text>
                  );
                  break;

                default:
                  return <Text>'ERROR'</Text>;
              }
            }}
          />
        </KeyboardAvoidingView>
      )}
      <View ref={lastMessageRef}></View>
    </SafeAreaView>
  );
};

export default Messages;
