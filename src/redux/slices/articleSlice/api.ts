import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../../api';
import { showTimeoutAlert } from '../../../utils/showAlert';
import { AxiosError } from 'axios';
import { ErrorType } from '../../../types/errorType';
import { articles } from '../../../api/testData';

export const getArticle = createAsyncThunk(
  'profile/getarticle',
  async (articleId: number, { dispatch }) => {
    try {
      return articles[0];

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
      if (error instanceof AxiosError) {
        if (error.response?.data instanceof ErrorType) {
          showTimeoutAlert(dispatch, {
            content: error.response.data.message,
            status: error.response.data.status,
            type: 'error',
          });
          return;
        }

        showTimeoutAlert(dispatch, {
          content: 'Возникла внутренняя ошибка системы',
          status: error.status || 500,
          type: 'error',
        });
        return;
      }
    }
  },
);
