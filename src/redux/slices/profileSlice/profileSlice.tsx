import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileType } from '../../../types/entities/profileType';
import { getProfile } from './api';

interface ProfileState {
  profile: ProfileType | null;
}

const initialState: ProfileState = {
  profile: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action: PayloadAction<ProfileType>) => {
      state.profile = action.payload;
    });
  },
});

export default profileSlice.reducer;
