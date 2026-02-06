import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getArticle, getArticles } from './api';
import { ArticleFilterType, ArticleType } from '../../../types/entities/articleType';

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
  },
  extraReducers: (builder) => {
    builder.addCase(getArticle.fulfilled, (state, action: PayloadAction<ArticleType>) => {
      state.article = action.payload;
    });
    builder.addCase(getArticles.fulfilled, (state, action: PayloadAction<ArticleType[]>) => {
      state.articles = action.payload;
    });
  },
});

export const { setFilter } = articleSlice.actions;

export default articleSlice.reducer;
