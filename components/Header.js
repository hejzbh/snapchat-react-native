import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
// NAVIGATION
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "../redux/slices/auth";
// ICONS
import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import Button from "./Button";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const Header = ({ whiteMode = false }) => {
  const { name: currentScreen } = useRoute();
  const { user } = useAuth();
  const { navigate } = useNavigation();

  return (
    <SafeAreaView
      className={`px-4 py-2 bg-white flex flex-row items-center justify-between absolute  top-0 z-20 left-0 right-0 ${
        whiteMode ? "bg-white" : "bg-transparent"
      }
      `}
    >
      <View className="flex items-center flex-row">
        {/** Avatar */}
        <Image
          source={{ uri: user?.bitmoji?.url }}
          className="w-[40px] h-[40px] rounded-full"
        />
        <Button
          extraClass={`${
            whiteMode ? "bg-gray/20" : "bg-black/20"
          } p-2 flex items-center justify-center mt-0 ml-3`}
          Icon={
            <FontAwesome
              name="search"
              size={20}
              color={whiteMode ? "black" : "white"}
            />
          }
          onPress={() => {
            //navigate("Search")
            signOut(auth);
          }}
        />
      </View>
      <Text>{currentScreen}</Text>
      <View className="flex items-center flex-row">
        <Button
          extraClass={`${
            whiteMode ? "bg-gray/20" : "bg-black/20"
          } p-2 flex items-center justify-center mt-0 mr-3`}
          Icon={
            <Ionicons
              name="person-add"
              size={20}
              color={whiteMode ? "black" : "white"}
            />
          }
          onPress={() => navigate("Friends")}
        />
        <Button
          extraClass={`${
            whiteMode ? "bg-gray/20" : "bg-black/20"
          } p-2 mt-0 flex items-center justify-center`}
          Icon={
            <Feather
              name="settings"
              size={22}
              color={whiteMode ? "black" : "white"}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Header;
