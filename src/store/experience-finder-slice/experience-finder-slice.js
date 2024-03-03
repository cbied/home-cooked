import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    foodTypes: [],
    dateRange: [],
    partySize: 1,
    location: {
        lat: null,
        lng: null
    },
    isLoading: false,
    error: null
}

export const experienceFinderSlice = createSlice({
    name: 'experienceFinder',
    initialState,
    reducers: {
        setFoodTypes: (state, action) => {
            state.foodTypes = action.payload
        },
        setDateRange: (state, action) => {
            state.dateRange = action.payload
        },
        setPartySize: (state, action) => {
            state.partySize = action.payload
        },
        setLocation: (state, action) => {
            state.location = action.payload
        }
    }
})

export const { setFoodTypes, setDateRange, setPartySize, setLocation } = experienceFinderSlice.actions;

export default experienceFinderSlice.reducer;