import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
  servermsg: null,
  serverStatus: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    userLogin: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.userInfo = payload;
    },
    userLogout: (state) => {
      state.loading = false;
      state.error = null;
      state.userInfo = null;
    },
    verificationEmail: (state, { payload }) => {
      state.userInfo.active = true;
      state.loading = false;
      state.error = null;
    },
    serServerResponseMsg: (state, { payload }) => {
      state.servermsg = payload;
      state.loading = false;
      state.error = null;
    },
    serServerResponseStatus: (state, { payload }) => {
      state.serverStatus = payload;
      state.loading = false;
      state.error = null;
    },
    stateReset: (state) => {
      state.loading = false;
      state.error = null;
      state.servermsg = null;
    },
    setUserOrder: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.orders = payload;
    },
  },
});

export const {
  setLoading,
  setError,
  userLogin,
  userLogout,
  stateReset,
  setUserOrder,
  serServerResponseMsg,
  serServerResponseStatus,
  verificationEmail,
} = userSlice.actions;

export default userSlice.reducer;

export const userSelector = (state) => state.user;
