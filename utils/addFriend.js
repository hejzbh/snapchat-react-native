import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export default async (loggedUser, strangerID) => {
  // Store me into his friend requestes (notifications);
  await setDoc(
    doc(db, "users", strangerID, "friendRequestes", loggedUser.uid),
    { user: loggedUser }
  );

  // Put that into their notification
  await setDoc(doc(db, "notifications", strangerID), {
    notifications: arrayUnion({
      from: loggedUser,
      message: `${loggedUser.username} wants to be a friend with you`,
    }),
  });
};
