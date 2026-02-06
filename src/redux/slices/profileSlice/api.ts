import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../../api';
import { ErrorType } from '../../../types/errorType';
import { errorHandler } from '../../../utils/errorHandler';

export const getProfile = createAsyncThunk(
  'profile/getprofile',
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
      errorHandler(error, dispatch);
    }
  },
);

export const getProfileArticles = createAsyncThunk(
  'profile/getprofilearticles',
  async (login: string, { dispatch }) => {
    try {
      const response = await instance.get(`profile/${login}/articles`);

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

export const getProfileComments = createAsyncThunk(
  'profile/getprofilecomments',
  async (login: string, { dispatch }) => {
    try {
      const response = await instance.get(`profile/${login}/comments`);

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

export const getProfileReactions = createAsyncThunk(
  'profile/getprofilereactions',
  async (login: string, { dispatch }) => {
    try {
      const response = await instance.get(`profile/${login}/reactions`);

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
