import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyProfileType } from '../../../types/entities/profileType';
import { login } from './api';

interface AuthState {
  isAuth: boolean;
  profile: MyProfileType | null;
}

const initialState: AuthState = {
  isAuth: false,
  profile: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<MyProfileType>) => {
      state.profile = action.payload;
      state.isAuth = true;
    });
  },
});

export default authSlice.reducer;
