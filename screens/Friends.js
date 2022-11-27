import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import React from "react";
// COMPONENTS
import Button from "../components/Button";
import QuickAdd from "../components/quick-add/QuickAdd";
import AddedMe from "../components/added-me/AddedMe";
// ICONS
import { SimpleLineIcons, Feather } from "@expo/vector-icons";
export const Friends = () => {
  const navigate = useNavigation();

  return (
    <SafeAreaView className="p-4">
      {/** Header of this screen */}
      <View className="flex flex-row justify-between items-center">
        {/** Go back */}
        <Button
          extraClass="p-2 mt-0 bg-transparent"
          Icon={<SimpleLineIcons name="arrow-down" size={20} color="gray" />}
          onPress={navigate.goBack}
        />
        {/** TITLE */}
        <Text className="font-bold text-lg">Add Friends</Text>
        {/** Settings */}
        <Button
          extraClass="p-2  mt-0 bg-transparent"
          Icon={<Feather name="settings" size={20} color="gray" />}
        />
      </View>
      {/** FRIENDS REQUESTES */}
      <AddedMe />
      {/** QUICK ADD */}
      <QuickAdd />
    </SafeAreaView>
  );
};

export default Friends;
