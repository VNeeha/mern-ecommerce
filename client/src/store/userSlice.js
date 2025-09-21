// EXTERNAL IMPORTS
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    signInUser: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
      };
    },
    signOutUser: (state) => {
      return { ...state, user: null, token: null };
    },
  },
});

export default userSlice;
export const userActions = userSlice.actions;
