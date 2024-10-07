import {configureStore} from '@reduxjs/toolkit';
import userSlice from './slices/userReducer';

const store=configureStore({
     devTools:true,
     reducer:{
        users:userSlice,
     }
})

export default store; 