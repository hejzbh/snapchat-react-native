import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
// Redux
import { login, logout } from "../redux/slices/auth";
// Utils
import getUserFirestoreData from "./getUserFirestoreData";
export default async (dispatch, setAllReady) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userFirestoreData = await getUserFirestoreData(user.uid);
      dispatch(
        login({
          uid: user.uid,
          accessToken: user.accessToken,
          ...userFirestoreData,
        })
      );
      setAllReady(true);
    } else {
      dispatch(logout());
      setAllReady(true);
    }
  });
};
