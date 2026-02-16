import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createReaction, getArticle, getArticleComments, getArticles } from './api';
import { ArticleFilterType, ArticleType } from '../../../types/entities/articleType';
import { CommentType } from '../../../types/entities/commentType';
import { ReactionType } from '../../../types/entities/reactionType';

/*
  article - состояние текущей редактируемой статьи
  articles - статьи в рекомендациях (на главной)
*/
interface ArticleState {
  article: ArticleType | null;
  articles: ArticleType[];
  filter: ArticleFilterType;
}

const initialState: ArticleState = {
  article: null,
  articles: [],
  filter: 'popular',
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
  },
});

export const { setFilter, decrementReaction } = articleSlice.actions;

export default articleSlice.reducer;
