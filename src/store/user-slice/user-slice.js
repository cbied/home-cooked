import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        currentUser: {
            firstName: '',
            lastName: '',
            displayName: '',
            email: '',
            phoneNumber: '',
            photoURL: ''
        },
        isLoading: false,
        error: null
    }

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInUser: (state, action) => {
            state.currentUser = action.payload
        },
        signUserOut: state => {
            state.currentUser = null
        },
        updateUserStart: (state, action) => {
            state.isLoading = true
        },
        updateUserSuccess: (state, action) => {
            console.log(action)
            state.isLoading = false
            state.currentUser = action.payload
        },
        updateUserFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export const { signInUser, signUserOut, updateUserStart, updateUserSuccess, updateUserFailed } = userSlice.actions;

export default userSlice.reducer;