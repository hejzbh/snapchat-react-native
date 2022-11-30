import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFriends } from "../redux/slices/friends";
import Button from "../components/Button";
import { useCameraPicture } from "../redux/slices/cameraPicture";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../redux/slices/auth";

export const SendTo = () => {
  const { user } = useAuth();
  const { friends } = useFriends();
  const [selectedFriends, setSelectedFriends] = useState([]);
  const { picture } = useCameraPicture();

  const sendSnap = async () => {
    /* await addDoc(collection(db, "snaps"), {
      author: user,
      sendTo: selectedFriends.map((selectedFriend) => ({
        id: selectedFriend,
        seen: false,
      })),
    });*/
  };

  console.log(friends);
  console.log("JOOOJ");
  return (
    <SafeAreaView>
      {friends.map((friend) => (
        <Button
          key={friend}
          title={friend}
          onPress={() => {
            if (selectedFriends.includes(friend)) {
              setSelectedFriends((friends) =>
                friends.filter((selectedFriend) => selectedFriend !== friend)
              );
            } else {
              setSelectedFriends((friends) => [...friends, friend]);
            }
          }}
          extraClass={`${
            selectedFriends.includes(friend) ? "bg-[green]" : "bg-[red]"
          }`}
        />
      ))}

      <Button title="send" onPress={sendSnap} />
    </SafeAreaView>
  );
};

export default SendTo;
