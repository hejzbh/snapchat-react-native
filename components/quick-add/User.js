import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
// Components
import Button from "../Button";
// Icons
import { Ionicons } from "@expo/vector-icons";
// Utisl
import acceptFriend from "../../utils/acceptFriend";
import addFriend from "../../utils/addFriend";
// REDUX
import { useAuth } from "../../redux/slices/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useFriends } from "../../redux/slices/friends";
const User = ({ user }) => {
  const [areUsersFriends, setAreUsersFriends] = useState(false);
  const [friendRequestSent, setFriendRequestSent] = useState(false);
  const [recievedFriendRequest, setRecievedFriendRequest] = useState(false);
  const { friends } = useFriends();
  const { user: loggedUser } = useAuth();

  useEffect(() => {
    // Did I send friend request to him ?
    getDoc(doc(db, "users", user.id, "friendRequestes", loggedUser.uid)).then(
      (request) => {
        if (request.exists()) {
          setFriendRequestSent(true);
        } else {
          setFriendRequestSent(false);
        }
      }
    );
    // Did he send request to me ?
    getDoc(doc(db, "users", loggedUser.uid, "friendRequestes", user.id)).then(
      (request) => {
        if (request.exists()) {
          setRecievedFriendRequest(true);
        } else {
          setRecievedFriendRequest(false);
        }
      }
    );
  }, []);

  useEffect(() => {
    setAreUsersFriends(friends.some((friend) => friend === user.id));
  }, [friends, user]);

  return (
    <View className="flex justify-between items-center flex-row bg-white p-2 rounded-xl mb-5">
      {/** BITMOJI */}
      <View className="bg-gry/20 p-1 rounded-full">
        <Image
          source={{ uri: user.bitmoji.url }}
          className="w-[40px] h-[40px] rounded-full"
        />
      </View>
      {/** Name and username */}
      <View className="flex-1 flex text-left">
        <Text className="text-[14px] text-black/60 font-bold">
          {user.first_name}
        </Text>
        <Text className="text-[12px] text-gray/50">{user.username}</Text>
      </View>
      {/** Add friend */}
      <Button
        disabled={friendRequestSent}
        extraClass={`py-2 px-4 rounded-2xl bg-[gray]/50 mt-0 ${
          recievedFriendRequest && "bg-[green]"
        }`}
        textColor="text-[gray]"
        Icon={
          <Ionicons
            name="person-add"
            style={{ marginRight: 6 }}
            size={15}
            color="gray"
          />
        }
        title={
          friendRequestSent
            ? "Sent"
            : recievedFriendRequest
            ? "Accept"
            : areUsersFriends
            ? "Friends"
            : "Add friend"
        }
        onPress={() => {
          if (!friendRequestSent && !recievedFriendRequest) {
            addFriend(loggedUser, user.id);
            setFriendRequestSent(true);
            return;
          }

          if (recievedFriendRequest) {
            acceptFriend(loggedUser, user);
            setAreUsersFriends(true);
            setRecievedFriendRequest(false);
          }
        }}
      />
    </View>
  );
};

export default User;
