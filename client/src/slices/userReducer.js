    import { createSlice } from "@reduxjs/toolkit";
    const initialState={
        users:[],
    };

    const userSlice=createSlice({
        name:'users',
        initialState,
        reducers:{
            addUser(state,action){
                const existingUser=state.users.find((user)=>user.id===action.payload.id);
                if(!existingUser){
                    state.users.push(action.payload);
                }
            },
            deleteUser(state,action){
                state.users= state.users.filter((user)=> user._id!==action.payload);
            },
            updateUser(state,action){
                const index=state.users.findIndex((user)=>user.id===action.payload.id);
                if(index!==-1){
                    state.users[index]={...state.users[index],...action.payload};
                }
            }
        }
    })

    export const {addUser,deleteUser,updateUser}=userSlice.actions;

    export default userSlice.reducer;

