import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

export default async (loggedUser, stranger) => {
  // Delete recieved friend request
  await deleteDoc(
    doc(db, "users", loggedUser.uid, "friendRequestes", stranger.id)
  );

  // Store both users in friends collection
  await addDoc(collection(db, "friends"), {
    friendFrom: new Date(),
    users: [loggedUser.uid, stranger.id],
  });

  // Put that into their notification
  await setDoc(doc(db, "notifications", stranger.id), {
    notifications: arrayUnion({
      from: loggedUser,
      message: `${loggedUser.username} accepted your friend request!`,
    }),
  });
};
