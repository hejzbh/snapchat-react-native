import { configureStore } from "@reduxjs/toolkit";
// Reducers - slices
import AuthSlice from "./slices/auth";
import cameraPicture from "./slices/cameraPicture";
import CameraPicture from "./slices/cameraPicture";
export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    cameraPicture: cameraPicture,
  },
});
