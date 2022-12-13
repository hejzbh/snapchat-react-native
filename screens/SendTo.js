import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFriends } from "../redux/slices/friends";
import Button from "../components/Button";
import { useCameraPicture } from "../redux/slices/cameraPicture";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../redux/slices/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import User from "../components/quick-add/User";
// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import uploadPictureToFirestore from "../utils/uploadPictureToFirestore";

export const SendTo = () => {
  const { user } = useAuth();
  const {
    params: { snapExpiresTime },
  } = useRoute();
  const { navigate } = useNavigation();
  const { friends } = useFriends();
  const [friendsData, setFriendsData] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const { picture } = useCameraPicture();

  useEffect(() => {
    getFriendsData(friends);
  }, [friends]);

  const sendSnap = async () => {
    let author = { ...user };
    delete author.accessToken;
    delete author.status;

    const { pictureURL } = await uploadPictureToFirestore(picture);
    console.log(pictureURL);
    await addDoc(collection(db, "snaps"), {
      authorID: author.id,
      author: author,
      sendTo: selectedFriends.map((selectedFriend) => ({
        id: selectedFriend.id,
      })),
      picture: pictureURL,
      snapExpiresTime: snapExpiresTime,
      timestamp: serverTimestamp(),
    }).then((res) => {
      navigate("Home");
    });
  };

  const getFriendsData = async (friends) => {
    let fetchedFriends = [];
    await new Promise((resolve) => {
      // Go through every friend and get his firestore data
      friends.map(async (friend) => {
        // His firestore data
        const data = await getDoc(doc(db, "users", friend)).then((doc) =>
          doc.data()
        );
        // Push that data in array fetched friends
        fetchedFriends.push(data);
        // If all friends are fetched, resolve promise
        if (fetchedFriends.length === friends.length) resolve();
      });
    });
    // Now we will have all fetched friends
    setFriendsData(fetchedFriends);
  };

  const toggleSelectedFriend = (friend) => {
    setSelectedFriends((selectedFriends) =>
      selectedFriends.includes(friend)
        ? selectedFriends.filter(
            (selectedFriend) => selectedFriend.id !== friend.id
          )
        : [...selectedFriends, friend]
    );
  };

  return (
    <SafeAreaView className="relative h-full">
      {/** LIST OF ALL FRIENDS */}
      {friends.length > 0 && friendsData.length > 0 && (
        <View className="px-3 py-4">
          {friends.map((friend) => {
            const user = friendsData.find(
              (friendData) => friendData.id === friend
            );
            const isUserSelected = selectedFriends.includes(user);

            if (user)
              return (
                <Pressable
                  key={user.id}
                  onPress={() => toggleSelectedFriend(user)}
                  className="mb-2"
                >
                  <User
                    key={user.id}
                    user={user}
                    showRequestButton={false}
                    extraClass={isUserSelected ? "bg-blue-400" : ""}
                  />
                </Pressable>
              );
          })}
        </View>
      )}
      {/** NO FRIENDS */}
      {friends.length === 0 && (
        <Text className="absolute top-[50%] left-[50%]">No friends</Text>
      )}
      {/** Selected friends, users we want send snap to */}
      {selectedFriends.length > 0 && (
        <View className="absolute bottom-0 left-0 w-full p-4 pr-10 py-6 bg-[#0EADFF] flex flex-row items-center">
          {selectedFriends.slice(0, 5).map((selectedFriend, i) => (
            <Text key={i} className="text-white">
              {selectedFriend.username}{" "}
            </Text>
          ))}
          {selectedFriends.length > 5 && "..."}
        </View>
      )}
      {/** Send button */}
      {selectedFriends.length > 0 && (
        <Button
          extraClass="bg-white p-2 absolute bottom-5 right-4"
          onPress={sendSnap}
          Icon={
            <MaterialCommunityIcons
              name="arrow-right-thick"
              size={18}
              color="black"
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default SendTo;
