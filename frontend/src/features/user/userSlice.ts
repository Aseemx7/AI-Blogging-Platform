import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");
const initialState = {
  user: storedUser ? JSON.parse(storedUser) : { name: "", email: "" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInfo: (state, action) => {
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
    },
  },
});

export const { userInfo } = userSlice.actions;
export default userSlice.reducer;
