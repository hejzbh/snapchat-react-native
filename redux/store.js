import { configureStore } from "@reduxjs/toolkit";
// Reducers - slices
import AuthSlice from "./slices/auth";
export const store = configureStore({
  reducer: {
    auth: AuthSlice,
  },
});
