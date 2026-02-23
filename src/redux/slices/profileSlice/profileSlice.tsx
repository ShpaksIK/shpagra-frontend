import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileResponseType, ProfileType } from '../../../types/entities/profileType';
import { createCommentReaction, deleteCommentReaction, getProfile } from './api';
import { CommentType } from '../../../types/entities/commentType';
import { CreateReactionType, ReactionType } from '../../../types/entities/reactionType';
import { getMyProfile } from '../authSlice/api';

/*
  profile - открытый профиль пользователя
*/
interface ProfileState {
  profile: ProfileType | null;
  profileComments: CommentType[];
  profileReactions: ReactionType[];
  loadings: {
    commentReaction: Record<number, { isLoading: boolean }>;
  };
}

const initialState: ProfileState = {
  profile: null,
  profileComments: [],
  profileReactions: [],
  loadings: {
    commentReaction: {},
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action: PayloadAction<ProfileResponseType>) => {
      if (!action.payload) return;
      const { comments, reactions, ...profileData } = action.payload;
      state.profile = profileData;
      state.profile.avatar = null;
      state.profileComments = comments;
      state.profileReactions = reactions;
    });
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
            comment.reactions.push(action.payload);
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
    builder.addCase(getMyProfile.fulfilled, (state, action: PayloadAction<ProfileResponseType>) => {
      if (!action.payload || !action.payload.comments) return;
      state.profileComments = action.payload.comments;
      state.profileReactions = action.payload.reactions;
    });
  },
});

export default profileSlice.reducer;
