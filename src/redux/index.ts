import { configureStore } from '@reduxjs/toolkit';
import appSlice from './slices/appSlice/appSlice';
import authSlice from './slices/authSlice/authSlice';
import profileSlice from './slices/profileSlice/profileSlice';
import articleSlice from './slices/articleSlice/articleSlice';

export const store = configureStore({
  reducer: {
    app: appSlice,
    auth: authSlice,
    profile: profileSlice,
    article: articleSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
