import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  address: {
      street: '',
      city: '',
      state: '',
      zip: '',
  },
  languagesSpoken: [],
  cuisineType: '',
  aboutHost: '',
  maxGuests: 1,
  isLoading: false,
  error: null,
};
