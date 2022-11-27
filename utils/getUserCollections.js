import { db } from "../firebase/config";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { setFriends } from "../redux/slices/friends";
export default async (dispatch, loggedUser) => {
  onSnapshot(
    query(
      collection(db, "friends"),
      where("users", "array-contains", loggedUser.uid)
    ),
    (snapshot) => {
      const friends = snapshot.docs.map((doc) => {
        const data = doc.data();
        return data.users.find((user) => user !== loggedUser.uid);
      });

      dispatch(setFriends(friends));
    }
  );
};
