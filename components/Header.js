import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
  const { path } = useRoute();
  return (
    <SafeAreaView className="px-4 py-1 bg-white flex flex-row items-center justify-between absolute  top-0 z-20 left-0 ">
      <View>
        <Text>User avatar</Text>
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
