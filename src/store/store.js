import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user-slice/user-slice';

export default configureStore({
  reducer: {
    user: userReducer
  }
})