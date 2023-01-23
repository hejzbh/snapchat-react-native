import { Dimensions, Image, Pressable, View } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
// REDUX
import { useAuth } from "../redux/slices/auth";
// Firebase
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
// Components
import Countdown from "../components/Countdown";

export const SnapView = () => {
  const { user } = useAuth();
  const { params } = useRoute();
  const { snaps } = params;
  const [activeSnap, setActiveSnap] = useState();
  const userDeviceWIDTH = Dimensions.get("screen").width;
  const navigation = useNavigation();

  useEffect(() => {
    if (!snaps || !user) return;
    findFirstUnviewedSnap(snaps, user).then((lastSnep) => {
      activeSnap?.id !== lastSnep.id && setActiveSnap(lastSnep);
    });
  }, [snaps, user?.uid]);

  useEffect(() => {
    if (!activeSnap || !user) return;
    makeSnapSeen(activeSnap.id, user);
    return;
  }, [activeSnap, user]);

  const findFirstUnviewedSnap = async (snaps, user) => {
    const snapIDs = snaps.map((snap) => snap.id);
    let firstUnviewedSnap = snaps[0]; // default value
    let unviewedSnaps = [];
    let counter = 0;

    await new Promise((resolve) => {
      // Go through every snap
      snapIDs.map(async (snapID, i) => {
        // Check if we already seen that snap
        const seen = await getDoc(
          doc(db, "snaps", snapID, "seen", user.uid)
        ).then((doc) => doc.exists());

        // If we didnt, push it in unviewedSnaps array
        if (!seen) {
          const unviewedSnap = snaps.find((snap) => snap.id === snapID);
          unviewedSnaps.push(unviewedSnap);
          counter++; // increase counter of unviewedSnaps by 1
        }
        // If we fetched all snaps and came to last one, resolve promise.
        if (i === snapIDs.length - 1) {
          resolve();
        }
      });
    });

    // unseen snaps exists ? take the oldest one, else keep default value;
    firstUnviewedSnap = unviewedSnaps[0] ? unviewedSnaps[0] : firstUnviewedSnap;
    return firstUnviewedSnap;
  };

  const makeSnapSeen = async (snapID, user) => {
    await setDoc(doc(db, "snaps", snapID, "seen", user.uid), {
      seen: true,
    });
  };

  const slide = (e, automaticSlide = false) => {
    let centerOfScreen = userDeviceWIDTH / 2;
    if (automaticSlide) {
      showNextSnep();
      return;
    }

    // If we clicked right on screen that means we want to show next snep
    if (e.nativeEvent.pageX > centerOfScreen) {
      showNextSnep();
    }
  };

  console.log(activeSnap);

  const showNextSnep = () => {
    const indexOfCurrentSnap = snaps.findIndex(
      (snap) => snap.id === activeSnap.id
    );

    const nextSnap = snaps[indexOfCurrentSnap + 1];

    if (nextSnap) {
      setActiveSnap(nextSnap);
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView className="w-full h-full relative">
      {activeSnap && (
        <Pressable onPress={slide}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{ uri: activeSnap.picture }}
          />
        </Pressable>
      )}
      {/** If activesnap not "not-expiration" include counter to show next snap after time expires */}
      {typeof activeSnap?.expires === "number" && (
        <View className="absolute top-[10%] bg-[#e6e628] right-5 z-[20] p-1 px-3 rounded-full">
          <Countdown
            expires={activeSnap.expires}
            onComplete={() => slide("", true)}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SnapView;
