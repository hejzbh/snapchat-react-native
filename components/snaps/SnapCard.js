import { View, Text, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
// ICONS
import { Ionicons } from "@expo/vector-icons";
import Button from "../Button";
// FIREBASE
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
// REDUX
import { useAuth } from "../../redux/slices/auth";
// Components
import { SnapStatus } from "./SnapStatus";
import SnapView from "./SnapView";
import { useNavigation } from "@react-navigation/native";
// UTILS
import goToChat from "../../utils/goToChat";

const SnapCard = ({ author, authorSnaps, extraClass = "" }) => {
  const { user } = useAuth();
  const [allSnapsSeen, setAllSnapsSeen] = useState(false);
  const [openSnap, setOpenSnap] = useState(false);
  const { navigate } = useNavigation();
  const openChat = () => {
    alert("Idemo chatat");
  };

  useEffect(() => {
    if (!user || !authorSnaps) return;
    let lastSnepID = authorSnaps[authorSnaps.length - 1]?.id;

    checkIfUserSeenAllSnaps(lastSnepID, user.uid);
  }, [user?.uid, authorSnaps]);

  const checkIfUserSeenAllSnaps = async (lastSnepID, userID) => {
    onSnapshot(doc(db, "snaps", lastSnepID, "seen", userID), (doc) => {
      if (doc.exists()) {
        setAllSnapsSeen(true);
      } else {
        setAllSnapsSeen(false);
      }
    });
  };

  return (
    <Pressable
      onPress={() => {
        allSnapsSeen
          ? goToChat(author, user, navigate)
          : navigate("SnapView", { author: author, snaps: authorSnaps });
      }}
    >
      <View
        className={`flex justify-between items-center flex-row bg-white/50 p-2 rounded-xl mb-5 ${extraClass}`}
      >
        {openSnap && <SnapView snaps={authorSnaps} author={author} />}
        {/** BITMOJI */}
        <View className="bg-gry/20 p-1 rounded-full">
          <Image
            source={{ uri: author.bitmoji.url }}
            className="w-[40px] h-[40px] rounded-full"
          />
        </View>
        {/** Name and open snap check */}
        <View className="flex-1 flex text-left">
          <Text className="text-[14px] text-black/60 font-bold">
            {author.first_name} {author.last_name}
          </Text>
          <SnapStatus allSnapsSeen={allSnapsSeen} />
        </View>

        {/** Open chat */}
        <Button
          extraClass="p-2 bg-transparent mt-0"
          Icon={<Ionicons name="md-chatbox-outline" size={24} color="black" />}
          onPress={openChat}
        />
      </View>
    </Pressable>
  );
};

export default SnapCard;
