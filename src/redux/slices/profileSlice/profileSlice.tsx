import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileType } from '../../../types/entities/profileType';
import { getProfile, getProfileArticles, getProfileComments, getProfileReactions } from './api';
import { ArticleType } from '../../../types/entities/articleType';
import { CommentType } from '../../../types/entities/commentType';
import { ReactionType } from '../../../types/entities/reactionType';

/*
  profile - открытый профиль пользователя
*/
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
    builder.addCase(getProfileArticles.fulfilled, (state, action: PayloadAction<ArticleType[]>) => {
      if (state.profile) {
        state.profile.articles = action.payload;
      }
    });
    builder.addCase(getProfileComments.fulfilled, (state, action: PayloadAction<CommentType[]>) => {
      if (state.profile) {
        state.profile.comments = action.payload;
      }
    });
    builder.addCase(
      getProfileReactions.fulfilled,
      (state, action: PayloadAction<ReactionType[]>) => {
        if (state.profile) {
          state.profile.reactions = action.payload;
        }
      },
    );
  },
});

export default profileSlice.reducer;
