import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foodTypes: [],
  dateRange: null,
  partySize: 1,
  location: {
    lat: 0,
    lng: 0,
  },
  formattedAddress: "",
  isLoading: false,
  error: null,
};

export const experienceFinderSlice = createSlice({
  name: "experienceFinder",
  initialState,
  reducers: {
    setFoodTypes: (state, action) => {
      state.foodTypes = action.payload;
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setPartySize: (state, action) => {
      state.partySize = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setFormattedAddress: (state, action) => {
      state.formattedAddress = action.payload;
    },
  },
});

export const {
  setFoodTypes,
  setDateRange,
  setPartySize,
  setLocation,
  setFormattedAddress,
} = experienceFinderSlice.actions;

export default experienceFinderSlice.reducer;
