import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export default async (userID, status) => {
  // Online - offline
  await updateDoc(doc(db, "users", userID), { status });
};
