import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createArticleComment,
  createReaction,
  getArticle,
  getArticleComments,
  getArticles,
} from './api';
import { ArticleFilterType, ArticleType } from '../../../types/entities/articleType';
import { CommentType } from '../../../types/entities/commentType';
import { ReactionType } from '../../../types/entities/reactionType';
import { LoadingType } from '../../../types/reduxType';

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
      state.articles = action.payload.map((article) => ({
        ...article,
        comments: [],
      }));
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
        if (action.payload.reaction) {
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
        if (action.payload.comment) {
          const article = state.articles.find((a) => a.id === action.payload.articleId);
          if (article) {
            article.comments.push(action.payload.comment);
            article.comments_length += 1;
            state.loadings.comment.isSuccess = true;
          }
        }
        state.loadings.comment.isLoading = false;
      },
    );
  },
});

export const { setFilter, decrementReaction, resetCommentLoading } = articleSlice.actions;

export default articleSlice.reducer;
