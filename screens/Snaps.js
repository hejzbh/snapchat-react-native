import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
// Components
import Header from "../components/Header";
import SnapCard from "../components/snaps/SnapCard";
// REDUX
import { useAuth } from "../redux/slices/auth";
// FIREBASE
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const SnapsPage = () => {
  const { user } = useAuth();
  const [snaps, setSnaps] = useState([]);

  useEffect(() => {
    if (!user) return;

    getSnaps(user);
  }, [user?.uid]);

  const getSnaps = async (user) => {
    onSnapshot(
      query(
        collection(db, "snaps"),
        where("sendTo", "array-contains-any", [{ id: user.uid }])
      ),
      (snapshot) => {
        const firestoreSnaps = snapshot.docs.map((snap) => ({
          ...snap.data(),
          id: snap.id,
        }));

        const snapAuthors = [
          ...new Set(firestoreSnaps.map((snap) => snap.authorID)),
        ].map(
          (id) => firestoreSnaps.find((snap) => snap.authorID === id).author
        );

        // TO prevent duplicate snap cards, for example, there is Michael who has
        // more than 10 snaps, to prevent 10 snaps cards, take all his snaps in one object
        const snaps = snapAuthors.map((author) => {
          const snapsOfAuthor = firestoreSnaps
            .filter((snap) => snap.author.id === author.id)
            .map((snap) => ({
              id: snap.id,
              expires: snap.snapExpiresTime,
              picture: snap.picture,
              timestamp: snap.timestamp,
            }))
            .sort((a, b) => a.timestamp - b.timestamp); // first snap will be most older one
          console.log(snapsOfAuthor);
          console.log("----------- AUTHORS -------------");
          return {
            author: author,
            snaps: snapsOfAuthor,
          };
        });

        // set snaps
        setSnaps(snaps);
      }
    );

    // Get also snaps we sent to someone
    // map kroz svaki id sendTo, uzeti podatke i staviti u snap array

    //   await getDocs(
    //     query(collection(db, "snaps"), where("authorID", "==", user.uid))
    //   ).then((doc) => {
    //   console.log(doc.docs.map((item) => item.data()));
    // });
  };

  return (
    <SafeAreaView className="h-full">
      <Header />
      <View className="mt-[18%] px-3">
        {snaps.length > 0 ? (
          snaps.map((snap) => (
            <SnapCard
              key={snap.author.id}
              author={snap.author}
              authorSnaps={snap.snaps}
            />
          ))
        ) : (
          <Text>No snaps</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SnapsPage;
