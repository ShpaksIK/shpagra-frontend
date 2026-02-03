import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../../api';
import { ErrorType } from '../../../types/errorType';
import { showTimeoutAlert } from '../../../utils/showAlert';
import { AxiosError } from 'axios';
import { LoginFormType, RegisterFormType } from '../../../types/formsType';
import { testMyUser } from '../../../api/testData';

export const login = createAsyncThunk(
  'auth/login ',
  async (loginData: LoginFormType, { dispatch }) => {
    try {
      return testMyUser;

      const response = await instance.post('auth/login', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.status >= 400) {
        const error: ErrorType = {
          status: response.status,
          message: response.statusText,
        };
        throw error;
      }

      return response.data;
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

export const register = createAsyncThunk(
  'auth/register ',
  async (registerData: RegisterFormType, { dispatch }) => {
    try {
      const response = await instance.post('auth/registration', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      if (response.status >= 400) {
        const error: ErrorType = {
          status: response.status,
          message: response.statusText,
        };
        throw error;
      }

      return response.data;
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

export const getMyProfile = createAsyncThunk('auth/getmyprofile ', async (_, { dispatch }) => {
  try {
    const response = await instance.get('auth/me');

    if (response.status >= 400) {
      const error: ErrorType = {
        status: response.status,
        message: response.statusText,
      };
      throw error;
    }

    return response.data;
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
});
