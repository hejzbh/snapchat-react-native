import { Image, View, Pressable, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// List of bitmojis
import bitmojisData from "../utils/constant/bitmojis";
import Button from "./Button";
// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BitmojiPicker = ({ bitmoji, onBitmojiSelected = () => {} }) => {
  const [selectedBitmoji, setSelectedBitmoji] = useState(
    bitmoji ? bitmoji : null
  );
  const [bitmojiGender, setBitmojiGender] = useState(
    bitmoji ? bitmoji.gender : "male"
  );
  const [bitmojis, setBitmojis] = useState(bitmojisData);

  useEffect(() => {
    if (!bitmojiGender) return;
    setBitmojis(
      bitmojisData.filter((bitmoji) => bitmoji.type === bitmojiGender)
    );
  }, [bitmojiGender]);

  const selectBitmoji = (bitmoji) => setSelectedBitmoji(bitmoji);

  const changeBitmojiGender = () =>
    setBitmojiGender((gender) => (gender === "male" ? "female" : "male"));

  return (
    <SafeAreaView className="fixed top-0 left-0 right-0 min-w-full min-h-full bg-black/30 z-20 p-4f">
      <View className=" bg-white m-5 mt-[70%] p-4 rounded-2xl">
        <Text className="text-center text-yellow-300 text-xl">
          Select your bitmoji
        </Text>
        {/** Show male or female bitmojis */}
        <Button
          Icon={
            <MaterialCommunityIcons
              name={`${
                bitmojiGender == "male" ? "gender-male" : "gender-female"
              }`}
              size={35}
              color={`${bitmojiGender == "female" ? "pink" : "blue"}`}
            />
          }
          extraClass="bg-transparent p-0 mb-10"
          onPress={changeBitmojiGender}
        />

        <View>
          <FlatList
            data={bitmojis}
            numColumns={3}
            contentContainerStyle={{
              display: "flex",
              margin: "auto",
              justifyContent: "center",
              alignItems: "center",
            }}
            keyExtractor={(item) => item.url}
            renderItem={({ item: bitmoji }, i) => (
              <Pressable
                onPress={() => selectBitmoji(bitmoji)}
                className={`${
                  selectedBitmoji?.url === bitmoji.url ? "opacity-50" : ""
                } m-2`}
                key={i}
              >
                <Image
                  style={{ width: 80, height: 80 }}
                  source={{ uri: bitmoji.url }}
                />
              </Pressable>
            )}
          />
        </View>

        {/** Submit */}
        <Button
          onPress={() => onBitmojiSelected(selectedBitmoji)}
          disabled={!selectedBitmoji}
          title="Confirm"
          extraClass="bg-transparent p-0 bg-yellow-300 p-3"
        />
      </View>
    </SafeAreaView>
  );
};

export default BitmojiPicker;
