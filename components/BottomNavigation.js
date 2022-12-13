import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
// Icons
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";
// Components
import Button from "./Button";
import { View } from "react-native";

const BottomNavigation = ({ bgTransparent = false }) => {
  const { name: currentScreen } = useRoute();
  const { navigate } = useNavigation();

  const navigationScreens = [
    {
      screen: "Location",
      IconProvider: Ionicons,
      iconName: "ios-location-outline",
    },
    {
      screen: "Snaps",
      IconProvider: MaterialIcons,
      iconName: "chat-bubble-outline",
    },
    {
      screen: "Home",
      IconProvider: Ionicons,
      iconName: "ios-camera-outline",
    },
    {
      screen: "Stories",
      IconProvider: FontAwesome5,
      iconName: "user-friends",
    },
    {
      screen: "Spotlight",
      IconProvider: Feather,
      iconName: "play",
    },
  ];

  return (
    <View
      className={`${
        bgTransparent ? "bg-black/80" : "bg-black"
      } flex flex-row z-[40] absolute bottom-0 left-0 items-center justify-between w-full h-[8%]`}
    >
      {navigationScreens.map(({ screen, iconName, IconProvider }, i) => (
        <Button
          keY={i}
          Icon={
            <IconProvider
              name={iconName}
              size={24}
              color={screen === currentScreen ? "yellow" : "white"}
            />
          }
          onPress={() => navigate(screen)}
          extraClass="p-4 bg-transparent mt-0 flex items-center justify-center m-0"
        />
      ))}
    </View>
  );
};

export default BottomNavigation;
