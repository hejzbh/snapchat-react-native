import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const FriendsSlice = createSlice({
  name: "User friends",
  initialState: {
    friends: [],
    recievedFriendRequestes: [],
  },
  reducers: {
    setFriends(state, action) {
      return { ...state, friends: action.payload };
    },
    addFriend(state, action) {
      const newFriend = action.payload;
      return { ...state, friends: [...state.friends, newFriend] };
    },
    removeFriend(state, action) {
      const { loggedUserID, removeFriendID } = action.payload;
      return {
        ...state,
        friends: state.friends.filter((friend) => friend.id !== removeFriendID),
      };
    },
  },
});

export const { setFriends, removeFriend, addFriend } = FriendsSlice.actions;
export const useFriends = () => useSelector((state) => state.friends);

export default FriendsSlice.reducer;
