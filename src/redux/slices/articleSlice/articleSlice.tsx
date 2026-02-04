import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getArticle } from './api';
import { ArticleType } from '../../../types/entities/articleType';

interface ArticleState {
  article: ArticleType | null;
}

const initialState: ArticleState = {
  article: null,
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArticle.fulfilled, (state, action: PayloadAction<ArticleType>) => {
      state.article = action.payload;
    });
  },
});

export default articleSlice.reducer;
