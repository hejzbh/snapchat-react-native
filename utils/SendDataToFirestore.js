import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export default async (path, id, data, merge = false) => {
  await setDoc(doc(db, path, id), data, { merge }).then((res) => {
    console.log(res);
    console.log("USPJESNO");
  });
};
