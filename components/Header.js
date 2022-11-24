import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "./Button";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
const Header = () => {
  const { path } = useRoute();
  return (
    <SafeAreaView className="px-4 py-1 bg-white flex flex-row items-center justify-between absolute  top-0 z-20 left-0 ">
      <View>
        <Button title={"User avatar"} onPress={() => signOut(auth)} />
        <Text>Search</Text>
      </View>
      <Text>{path}</Text>
      <View>
        <Text>Add friend</Text>
        <Text>More</Text>
      </View>
    </SafeAreaView>
  );
};

export default Header;
