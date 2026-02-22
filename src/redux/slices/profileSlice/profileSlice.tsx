import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyProfileResponseType, ProfileType } from '../../../types/entities/profileType';
import {
  createCommentReaction,
  deleteCommentReaction,
  getProfile,
  getProfileComments,
  getProfileReactions,
} from './api';
import { CommentType } from '../../../types/entities/commentType';
import { CreateReactionType, ReactionType } from '../../../types/entities/reactionType';
import { getMyProfile } from '../authSlice/api';

/*
  profile - открытый профиль пользователя
*/
interface ProfileState {
  profile: ProfileType | null;
  profileComments: CommentType[];
  loadings: {
    commentReaction: Record<number, { isLoading: boolean }>;
  };
}

const initialState: ProfileState = {
  profile: null,
  profileComments: [],
  loadings: {
    commentReaction: {},
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action: PayloadAction<ProfileType>) => {
      if (!action.payload) return;
      state.profile = action.payload;
      state.profile.avatar = null;
      state.profile.reactions = [];
    });
    builder.addCase(
      getProfileReactions.fulfilled,
      (state, action: PayloadAction<ReactionType[]>) => {
        if (state.profile) {
          state.profile.reactions = action.payload;
        }
      },
    );
    builder.addCase(createCommentReaction.pending, (state, action) => {
      const { commentId } = action.meta.arg;
      state.loadings.commentReaction[commentId] = {
        isLoading: true,
      };
    });
    builder.addCase(deleteCommentReaction.pending, (state, action) => {
      const { commentId } = action.meta.arg;
      state.loadings.commentReaction[commentId] = {
        isLoading: true,
      };
    });
    builder.addCase(
      createCommentReaction.fulfilled,
      (state, action: PayloadAction<CreateReactionType, string, any>) => {
        const { commentId } = action.meta.arg;

        if (action.payload) {
          const comment = state.profileComments.find(
            (comment) => comment.id === action.payload.id_entity,
          );

          if (comment) {
            comment.reactions.push({
              id: action.payload.id,
              content: action.payload.content,
              author_login: action.payload.author_login,
            });
          }
        }
        state.loadings.commentReaction[commentId].isLoading = false;
      },
    );
    builder.addCase(
      deleteCommentReaction.fulfilled,
      (state, action: PayloadAction<{ success: boolean; reactionId: number }, string, any>) => {
        const { commentId } = action.meta.arg;

        if (action.payload?.success) {
          const comment = state.profileComments.find((comment) =>
            comment.reactions.some((r) => r.id === action.payload.reactionId),
          );

          if (comment) {
            comment.reactions = comment.reactions.filter((r) => r.id !== action.payload.reactionId);
          }
        }
        state.loadings.commentReaction[commentId].isLoading = false;
      },
    );
    builder.addCase(
      getMyProfile.fulfilled,
      (state, action: PayloadAction<MyProfileResponseType>) => {
        if (!action.payload || !action.payload.comments) return;
        state.profileComments = action.payload.comments;
      },
    );
  },
});

export default profileSlice.reducer;
