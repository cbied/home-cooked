import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        isloading: false
    },
    reducers: {
        signInUser: (state, action) => {
            state.currentUser = action.payload
        },
        signUserOut: state => {
            state.currentUser = null
        }
    }
})

export const { signInUser, signUserOut } = userSlice.actions;

export default userSlice.reducer;