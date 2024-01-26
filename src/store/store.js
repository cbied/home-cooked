import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import userReducer from './user-slice/user-slice';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
    user: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({reducer: persistedReducer})
export const persistor = persistStore(store)
