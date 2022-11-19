import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
// Redux
import { login, logout } from "../redux/slices/auth";
export default (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("HALOOOOOOOO");
      dispatch(
        login({
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          accessToken: user.accessToken,
        })
      );
    } else {
      dispatch(logout());
    }
  });
};
