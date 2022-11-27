import { configureStore } from "@reduxjs/toolkit";
// Reducers - slices
import AuthSlice from "./slices/auth";
import cameraPicture from "./slices/cameraPicture";
import FriendsSlice from "./slices/friends";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    cameraPicture: cameraPicture,
    friends: FriendsSlice,
  },
});
