import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyProfileType } from '../../../types/entities/profileType';
import { getMyProfile, login, logout } from './api';

/*
  profile - профиль пользователя, если авторизован
*/
interface AuthState {
  profile: MyProfileType | null;
}

const initialState: AuthState = {
  profile: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<MyProfileType>) => {
      state.profile = action.payload;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.profile = null;
    });
    builder.addCase(getMyProfile.fulfilled, (state, action: PayloadAction<MyProfileType>) => {
      state.profile = action.payload;
    });
  },
});

export default authSlice.reducer;
