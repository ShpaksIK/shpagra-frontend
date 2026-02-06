import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../../api';
import { ErrorType } from '../../../types/errorType';
import { errorHandler } from '../../../utils/errorHandler';
import { ArticleType, CreateArticleType } from '../../../types/entities/articleType';
import { showTimeoutAlert } from '../../../utils/showAlert';

export const getArticle = createAsyncThunk(
  'profile/getarticle',
  async (articleId: number, { dispatch }) => {
    try {
      const response = await instance.get(`articles/${articleId}`);

      if (response.status >= 400) {
        const error: ErrorType = {
          status: response.status,
          message: response.statusText,
        };
        throw error;
      }

      return response.data.data;
    } catch (error) {
      errorHandler(error, dispatch);
    }
  },
);

export const getArticles = createAsyncThunk('profile/getarticles', async (_, { dispatch }) => {
  try {
    const response = await instance.get(`articles/`);

    if (response.status >= 400) {
      const error: ErrorType = {
        status: response.status,
        message: response.statusText,
      };
      throw error;
    }

    return response.data.data;
  } catch (error) {
    errorHandler(error, dispatch);
  }
});

interface CreateArticleThunkType {
  article: CreateArticleType;
  to: 'draft' | 'moderation';
}

export const createArticle = createAsyncThunk(
  'profile/createarticle',
  async ({ article, to }: CreateArticleThunkType, { dispatch }) => {
    try {
      const response = await instance.post(`articles`, {
        article: {
          ...article,
        },
        to: to,
      });

      if (response.status >= 400) {
        const error: ErrorType = {
          status: response.status,
          message: response.statusText,
        };
        throw error;
      }

      showTimeoutAlert(dispatch, {
        type: 'success',
        content: 'Статья создана в черновика',
      });

      return response.data.data;
    } catch (error) {
      errorHandler(error, dispatch);
    }
  },
);

export const removeArticle = createAsyncThunk(
  'profile/removearticle',
  async (articleId: number, { dispatch }) => {
    try {
      const response = await instance.delete(`articles/${articleId}`);
      if (response.status >= 400) {
        const error: ErrorType = {
          status: response.status,
          message: response.statusText,
        };
        throw error;
      }

      showTimeoutAlert(dispatch, {
        type: 'success',
        content: 'Статья удалена',
      });

      return response.data.data;
    } catch (error) {
      errorHandler(error, dispatch);
    }
  },
);

interface UpdateArticleThunkType {
  articleId: number;
  article: Partial<ArticleType>;
}

export const updateArticle = createAsyncThunk(
  'profile/removearticle',
  async ({ articleId, article }: UpdateArticleThunkType, { dispatch }) => {
    try {
      const response = await instance.put(`articles/${articleId}`, {
        ...article,
      });

      if (response.status >= 400) {
        const error: ErrorType = {
          status: response.status,
          message: response.statusText,
        };
        throw error;
      }

      showTimeoutAlert(dispatch, {
        type: 'success',
        content: 'Статья изменена',
      });

      return response.data.data;
    } catch (error) {
      errorHandler(error, dispatch);
    }
  },
);
