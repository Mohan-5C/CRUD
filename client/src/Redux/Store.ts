// import { applyMiddleware, configureStore} from "@reduxjs/toolkit";
// import { thunk } from "redux-thunk";
// import userSlice from "./Slices/userReducer";

// const Store = configureStore({
//   devTools: true,
//   reducer: {
//     users: userSlice,
//     middleware:[thunk],
//   },

// });

// export default Store;



import { configureStore } from "@reduxjs/toolkit"; // Import necessary functions
import  {thunk}   from "redux-thunk"; // Import thunk middleware
import userSlice from "./Slices/userReducer"; // Import your user slice
 // Import UserState type from your slice


// Create the Redux store
const store = configureStore({
  reducer: {
    users: userSlice, // Assign the user reducer
    // `middleware: (gDM) => gDM().concat(logger, apiMiddleware, yourCustomMiddleware)`

  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(thunk), // Specify ThunkMiddleware type
  devTools: process.env.NODE_ENV !== 'production', // Enable devTools in development mode
});

// Export the store
export type AppDispatch = typeof store.dispatch;
export default store;



