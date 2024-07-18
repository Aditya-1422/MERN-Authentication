import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentUser : null,
    loading : false,
    error : false
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers :{
        loginInStart : (state) =>{
            state.loading = true
        },
        loginInSuccess : (state,action) => {
            state.currentUser = action.payload
            state.error = false
            state.loading = false
        },
        loginInFailure : (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        updateUserStart: (state) => {
            state.loading = true;
          },
          updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
          },
          updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
          logout: (state,action) => {
            state.currentUser = action.payload
            state.error = false
            state.loading = false
          },
          deleteUserStart: (state) => {
            state.loading = true;
          },
          deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
          },
          deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
    }
})

export const {loginInFailure, loginInStart, loginInSuccess, logout, updateUserFailure,updateUserStart,updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess} = userSlice.actions

export default userSlice.reducer