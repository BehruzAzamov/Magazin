import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../utils/axiosClients";

const initialState = {
  user: null,
  pending: false,
};

const access_token = window.localStorage.getItem("access-token") 

export const checkUser = createAsyncThunk("user/checkUser", async () => {
  const response = await axiosClient.post("/auth/get-user",{
    access_token
  });
  return response.data
  
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
      
      window.localStorage.setItem("access_token", payload.access_token);
      window.localStorage.setItem("refresh_token", payload.refresh_token);
    },
    logout: (state) => {
      state.user = null;
      window.localStorage.removeItem("access_token");
      window.localStorage.removeItem("refresh_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUser.pending, (state) => {
        state.pending = true;
      })
      .addCase(checkUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.pending = false;
      })
      .addCase(checkUser.rejected, (state) => {
        state.pending = false;
      });
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
