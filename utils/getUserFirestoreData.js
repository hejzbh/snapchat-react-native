import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export default async (userID) => {
  return await getDoc(doc(db, "users", userID)).then((data) =>
    data.exists() ? data.data() : {}
  );
};
