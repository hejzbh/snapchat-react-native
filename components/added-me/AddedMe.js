import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
// REDUX
import { useAuth } from "../../redux/slices/auth";
import { useFriends } from "../../redux/slices/friends";
// FIREBASE
import { db } from "../../firebase/config";
import { getDocs, collection } from "firebase/firestore";
// Components
import User from "../quick-add/User";

const AddedMe = () => {
  const { user } = useAuth();
  const { friends } = useFriends();
  const [friendsRequestes, setFriendsRequestes] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;
    getFriendRequestes(user.uid);
  }, [user?.uid, friends]);

  const getFriendRequestes = async (userID) => {
    await getDocs(collection(db, "users", userID, "friendRequestes")).then(
      ({ docs }) => {
        const friendRequestes = docs.map((doc) => doc.data());

        setFriendsRequestes(friendRequestes);
      }
    );
  };

  if (friendsRequestes.length === 0) return "";

  return (
    <View>
      <View className="py-2">
        <Text className="text-lg text-gray/20">Added me</Text>
      </View>
      {/** LIST OF USERS WHO SENT FRIEND REQUEST TO ME */}
      {friendsRequestes.map(({ user }) => (
        <User key={user.id} user={user} />
      ))}
    </View>
  );
};

export default AddedMe;
