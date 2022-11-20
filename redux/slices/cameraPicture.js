import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const CameraPictureSlice = createSlice({
  name: "Picture that user took with camera or took from their gallery",
  initialState: {
    picture: null,
  },
  reducers: {
    setPicture(state, action) {
      state.picture = action.payload;
    },
    removePicture(state) {
      if (state.picture === null) return;

      state.picture = null;
    },
  },
});

export const { setPicture, removePicture } = CameraPictureSlice.actions;
export const useCameraPicture = () =>
  useSelector((state) => state.cameraPicture);

export default CameraPictureSlice.reducer;
