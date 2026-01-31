import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../../api';
import { showTimeoutAlert } from '../../../utils/showAlert';
import { AxiosError } from 'axios';
import { ErrorType } from '../../../types/errorType';

export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async (login: string, { dispatch }) => {
    try {
      const response = await instance.get(`profile/${login}`);
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
