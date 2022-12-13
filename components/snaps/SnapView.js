import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
// REDUX
import { useAuth } from "../../redux/slices/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
// FIREBASE

const SnapView = ({ snaps, author }) => {
  const { user } = useAuth();
  const [activeSnap, setActiveSnap] = useState(snaps[0]);
  console.log("------------------------------");
  useEffect(() => {
    if (!snaps || !user) return;
    findFirstUnseenSnap(snaps, user).then((lastSnep) => {
      if (activeSnap.id === lastSnep.id) return;
      setActiveSnap(lastSnep);
    });
  }, [snaps, user?.uid]);
  console.log(activeSnap);
  useEffect(() => {
    if (!activeSnap) return;
    makeSnapSeen(activeSnap.id, user);
  }, [activeSnap, user]);

  const makeSnapSeen = async (snapID, user) => {
    await setDoc(doc(db, "snaps", snapID, "seen", user.uid), { seen: true });
  };

  const findFirstUnseenSnap = async (snaps, user) => {
    const snapIDs = snaps.map((snap) => snap.id);
    let firstUnseenSnap = snaps[0]; // default value
    await new Promise((resolve) => {
      snapIDs.map(async (snapID, i) => {
        const snap = await getDoc(
          doc(db, "snaps", snapID, "seen", user.uid)
        ).then((doc) => {
          if (doc.exists()) {
          } else {
            firstUnseenSnap = snaps.find((snap) => snap.id === snapID);
            resolve();
          }

          i === snapID.length && resolve();
        });
      });
    });

    return firstUnseenSnap;
  };

  return (
    <View className="absolute top-0 left-0 h-full">
      {activeSnap && (
        <Image
          source={{ uri: activeSnap.picture.url }}
          className="w-full h-full"
        />
      )}
    </View>
  );
};

export default SnapView;

const findFirstUnseenStory = async (stories, user) => {
  const storyIDs = stories.map((story) => story.id); // all stories from the user we clicked on

  let unseenStory = stories[0]; // default value is first story. In case we will not find unseen story, the slider will start from first story

  await new Promise((resolve) => {
    // go through every story and check if the logged user has not seen it
    storyIDs.map(async (storyID, i) => {
      // Reference to STORY SEEN doc where logged user is already stored,
      // if he is stored, that mean he has seen that story
      await getDoc(doc(db, "stories", storyID, "seen", user.uid)).then(
        (story) => {
          if (story.exists()) {
            // nothing, user is already seen it
          } else {
            unseenStory = stories.find((story) => story.id === storyID);
            resolve(); // finish function
          }

          //if we went through all the stories and have not found
          //a story that the logged in user has not seen, end the function.
          i === storyIDs.length && resolve();
        }
      );
    });
  });
};
