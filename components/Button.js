import { Text } from "react-native";
import tw from "tailwind-react-native-classnames";
import React from "react";
import { Pressable } from "react-native";

const Button = ({
  title,
  Icon,
  onPress,
  extraClass = "",
  disabled = false,
  textColor = "red",
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`p-4 px-8 rounded-3xl mt-8 flex items-center justify-center ${
        disabled ? "bg-blue-400" : "bg-blue-600"
      } ${extraClass}`}
    >
      {Icon && Icon}
      <Text className={`text-white font-bold ${textColor}`}>{title}</Text>
    </Pressable>
  );
};

export default Button;