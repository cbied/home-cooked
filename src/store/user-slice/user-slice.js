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
        signInUserWithEmailStart: state => {
            state.isLoading = true
        },
        signInUserWithEmailSuccess: (state, action) => {
            state.isLoading = false
            state.currentUser = action.payload
        },
        signInUserWithEmailFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        signUserOut: state => {
            state.currentUser = null
        },
        signInUserWithGoogleStart: state => {
            state.isLoading = true
        },
        signInUserWithGoogleSuccess: (state, action) => {
            state.isLoading = false
            state.currentUser = action.payload
        },
        signInUserWithGoogleFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        updateUserStart: state => {
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

export const { signInUserWithEmailStart, signInUserWithEmailSuccess, signInUserWithEmailFailed,
               updateUserStart, updateUserSuccess, updateUserFailed,
               signInUserWithGoogleStart, signInUserWithGoogleSuccess, signInUserWithGoogleFailed,
               signUserOut, } = userSlice.actions;

export default userSlice.reducer;