import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export default async (path, id, data, merge = false) => {
  console.log(id);
  console.log("STORING DATA");
  await setDoc(doc(db, path, id), data, { merge }).then((res) => {
    console.log(res);
    console.log("USPJESNO");
  });
};
