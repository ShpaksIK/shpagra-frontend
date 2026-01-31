import { createSlice } from '@reduxjs/toolkit';
import { MyProfileType } from '../../../types/entities/profileType';

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
});

export default authSlice.reducer;
