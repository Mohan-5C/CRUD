import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import userSlice from "./Slices/userReducer";

const Store = configureStore({
  devTools: true,
  reducer: {
    users: userSlice,
    middleware: [thunk],
  },
});

export default Store;
