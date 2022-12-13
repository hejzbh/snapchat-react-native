import { View, Text } from "react-native";

export const SnapStatus = ({ allSnapsSeen }) => {
  if (allSnapsSeen) {
    return (
      <View className="flex flex-row items-center">
        <View className="p-[5px] max-w-[5px] border-[1px] border-[red] mr-2"></View>
        <Text className="text-gray-500 text-[13px]">Recieved</Text>
      </View>
    );
  }

  if (!allSnapsSeen) {
    return (
      <View className="flex flex-row items-center">
        <View className="p-[5px] rounded-sm bg-[red] mr-2 max-w-[5px]"></View>
        <Text style={{ color: "red" }} className="font-bold text-[13px]">
          New Snap
        </Text>
      </View>
    );
  }
};
