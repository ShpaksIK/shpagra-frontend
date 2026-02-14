import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../../api';
import { ErrorType } from '../../../types/errorType';
import { errorHandler } from '../../../utils/errorHandler';

export const getProfile = createAsyncThunk(
  'profile/getprofile',
  async (login: string, { dispatch }) => {
    try {
      const response = await instance.get(`profiles/${login}`);

      if (!response.data.success) {
        const error: ErrorType = {
          status: response.data.status,
          message: response.data.message,
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
      const response = await instance.get(`profiles/${login}/articles`);

      if (!response.data.success) {
        const error: ErrorType = {
          status: response.data.status,
          message: response.data.message,
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
      const response = await instance.get(`profiles/${login}/comments`);

      if (!response.data.success) {
        const error: ErrorType = {
          status: response.data.status,
          message: response.data.message,
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
      const response = await instance.get(`profiles/${login}/reactions`);

      if (!response.data.success) {
        const error: ErrorType = {
          status: response.data.status,
          message: response.data.message,
        };
        throw error;
      }

      return response.data.data;
    } catch (error) {
      errorHandler(error, dispatch);
    }
  },
);
