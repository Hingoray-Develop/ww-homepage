import { createSlice } from "@reduxjs/toolkit";

export type LoadingInitialState = {
  loadingStatus: boolean;
};

export const loadingInitialState: LoadingInitialState = {
  loadingStatus: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState: loadingInitialState,
  reducers: {
    showLoading(state) {
      state.loadingStatus = true;
    },
    hideLoading(state) {
      state.loadingStatus = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showLoading, hideLoading } = loadingSlice.actions;

export default loadingSlice;
