import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
// Redux
import { login, logout } from "../redux/slices/auth";

export default async (dispatch, setAllReady) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        login({
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          accessToken: user.accessToken,
        })
      );
      setAllReady(true);
    } else {
      dispatch(logout());
      setAllReady(true);
    }
  });
};
