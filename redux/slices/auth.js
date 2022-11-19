import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
export const AuthSlice = createSlice({
  name: "User authentication details",
  initialState: {
    user: null,
  },
  reducers: {
    login(state, action) {
      console.log(action);
      state.user = action.payload;
    },
    logout(state) {
      if (state.user === null) return;

      state.user = null;
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export const useAuth = () => useSelector((state) => state.auth);

export default AuthSlice.reducer;
