import { db } from "../firebase/config";
import { setDoc, doc } from "firebase/firestore";

export default async (stranger, loggedUser) => {
  let id =
    loggedUser.uid > stranger.id
      ? loggedUser.uid + stranger.id
      : stranger.id + loggedUser.uid;

  await setDoc(doc(db, "chats", id), {
    users: [stranger, loggedUser],
    id: id,
  });

  return {
    id: id,
    users: [stranger, loggedUser],
  };
};
