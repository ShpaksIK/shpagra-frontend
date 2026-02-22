import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createArticleComment,
  createArticleCommentReaction,
  createReaction,
  deleteArticleCommentReaction,
  getArticle,
  getArticleComments,
  getArticles,
} from './api';
import { ArticleFilterType, ArticleType } from '../../../types/entities/articleType';
import { CommentType } from '../../../types/entities/commentType';
import { CreateReactionType, ReactionType } from '../../../types/entities/reactionType';
import { LoadingType } from '../../../types/reduxType';
import { getMyProfile } from '../authSlice/api';
import { MyProfileResponseType } from '../../../types/entities/profileType';

/*
  article - состояние текущей редактируемой статьи
  articles - статьи в рекомендациях (на главной)
*/
interface ArticleState {
  article: ArticleType | null;
  articles: ArticleType[];
  filter: ArticleFilterType;
  loadings: {
    comment: LoadingType;
    commentReaction: Record<number, { isLoading: boolean }>;
  };
}

const initialState: ArticleState = {
  article: null,
  articles: [],
  filter: 'popular',
  loadings: {
    comment: {
      isLoading: false,
      isSuccess: false,
      isDone: false,
    },
    commentReaction: {},
  },
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<ArticleFilterType>) {
      state.filter = action.payload;
    },
    decrementReaction(state, action: PayloadAction<{ articleId: number; profileLogin: string }>) {
      const article = state.articles.find((a) => a.id === action.payload.articleId);
      if (article) {
        if (article.reactions.find((r) => r.author_login === action.payload.profileLogin)) {
          article.reactions = article.reactions.filter(
            (r) => r.author_login !== action.payload.profileLogin,
          );
          article.reactions_length -= 1;
        }
      }
    },
    resetCommentLoading: (state) => {
      state.loadings.comment = {
        isLoading: false,
        isSuccess: false,
        isDone: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getArticle.fulfilled, (state, action: PayloadAction<ArticleType>) => {
      state.article = action.payload;
    });
    builder.addCase(getArticles.fulfilled, (state, action: PayloadAction<ArticleType[]>) => {
      state.articles = action.payload;
    });
    builder.addCase(
      getArticleComments.fulfilled,
      (state, action: PayloadAction<{ articleId: number; comments: CommentType[] }>) => {
        const article = state.articles.find((a) => a.id === action.payload.articleId);
        if (article) {
          article.comments = action.payload.comments;
        }
      },
    );
    builder.addCase(
      createReaction.fulfilled,
      (state, action: PayloadAction<{ articleId: number; reaction: ReactionType }>) => {
        if (action.payload?.reaction) {
          const article = state.articles.find((a) => a.id === action.payload.articleId);
          if (article) {
            article.reactions.push(action.payload.reaction);
            article.reactions_length += 1;
          }
        }
      },
    );
    builder.addCase(createArticleComment.pending, (state) => {
      state.loadings.comment.isLoading = true;
    });
    builder.addCase(
      createArticleComment.fulfilled,
      (state, action: PayloadAction<{ articleId: number; comment: CommentType }>) => {
        if (action.payload?.comment) {
          const article = state.articles.find((a) => a.id === action.payload.articleId);
          if (article) {
            article.comments.unshift(action.payload.comment);
            article.comments_length += 1;
            state.loadings.comment.isSuccess = true;
          }
        }
        state.loadings.comment.isLoading = false;
      },
    );
    builder.addCase(createArticleCommentReaction.pending, (state, action) => {
      const { commentId } = action.meta.arg;
      state.loadings.commentReaction[commentId] = {
        isLoading: true,
      };
    });
    builder.addCase(deleteArticleCommentReaction.pending, (state, action) => {
      const { commentId } = action.meta.arg;
      state.loadings.commentReaction[commentId] = {
        isLoading: true,
      };
    });
    builder.addCase(
      createArticleCommentReaction.fulfilled,
      (state, action: PayloadAction<CreateReactionType, string, any>) => {
        const { commentId } = action.meta.arg;

        if (action.payload) {
          const comment = state.articles
            .flatMap((article) => article.comments)
            .find((comment) => comment.id === action.payload.id_entity);

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
      deleteArticleCommentReaction.fulfilled,
      (state, action: PayloadAction<{ success: boolean; reactionId: number }, string, any>) => {
        const { commentId } = action.meta.arg;

        if (action.payload?.success) {
          const comment = state.articles
            .flatMap((article) => article.comments)
            .find((comment) => comment.reactions.some((r) => r.id === action.payload.reactionId));

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
        if (!action.payload || !action.payload.articles) return;
        state.articles = action.payload.articles;
      },
    );
  },
});

export const { setFilter, decrementReaction, resetCommentLoading } = articleSlice.actions;

export default articleSlice.reducer;
