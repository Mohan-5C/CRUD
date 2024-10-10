import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  users: [],
  loading:false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reqStart(state) {
      state.loading = true;
      console.log("req started..",state.loading);
    },
    reqSuccess(state) {
      state.loading = false;
      console.log("req success..",state.loading);
    },
    reqFailure(state) {
      state.loading = false;
      console.log("req ended..",state.loading);
    },
    addUser(state, action) {
      console.log(action.payload);
      const existingUser = state.users.find(
        (user) => user._id === action.payload._id || user.email === action.payload.email
      );
      if (!existingUser) {
        console.log("okk");
        state.users.push(action.payload);
        console.log("add payload", action.payload);
        // state.users=[...state.users,action.payload];
      }
      // state.users=[...state.users,action.payload];
    },
    deleteUser(state, action) {
      state.users = state.users.filter((user) => user._id !== action.payload);
      console.log("delete payload", action.payload);
    },
    updateUser(state, action) {
      const index = state.users.findIndex(
        (user) => user._id === action.payload.id
      );
      console.log("update payload", action.payload);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
      }
    },
  },
});

export const {
  reqStart,
  reqSuccess,
  reqFailure,
  addUser,
  deleteUser,
  updateUser,
} = userSlice.actions;

export default userSlice.reducer;
