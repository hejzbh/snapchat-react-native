import { db } from "../firebase/config";
import { setDoc, doc, getDoc } from "firebase/firestore";

export default async (chatID) => {
  const chat = await getDoc(doc(db, "chats", chatID));
  return chat;
};
