import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import updateOnlineStatus from "../../utils/updateOnlineStatus";
export const AuthSlice = createSlice({
  name: "User authentication details",
  initialState: {
    user: null,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      updateOnlineStatus(state.user.uid, "online");
    },
    logout(state) {
      if (state.user) updateOnlineStatus(state.user.uid, "offline");
      if (state.user === null) return;

      state.user = null;
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export const useAuth = () => useSelector((state) => state.auth);

export default AuthSlice.reducer;
