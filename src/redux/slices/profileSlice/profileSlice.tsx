import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileType } from '../../../types/entities/profileType';
import { getProfile, getProfileArticles } from './api';
import { ArticleType } from '../../../types/entities/articleType';

interface ProfileState {
  profile: ProfileType | null;
  articles: ArticleType[] | null;
}

const initialState: ProfileState = {
  profile: null,
  articles: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action: PayloadAction<ProfileType>) => {
      state.profile = action.payload;
    });
    builder.addCase(getProfileArticles.fulfilled, (state, action: PayloadAction<ArticleType[]>) => {
      state.articles = action.payload;
    });
  },
});

export default profileSlice.reducer;
