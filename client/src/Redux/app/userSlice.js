import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authorized: false,
    token: null
  },
  reducers: {
    userAuthorized: (state, action) => {
      state.authorized = true;
      state.token = action.payload
    },
    userLogout: (state) => {
      state.authorized = false,
        state.token = null
    },
  },
});

export const { userAuthorized, userLogout } = userSlice.actions
export default userSlice.reducer