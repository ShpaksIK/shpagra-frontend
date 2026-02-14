import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../../api';
import { ErrorType } from '../../../types/errorType';
import { showTimeoutAlert } from '../../../utils/showAlert';
import { LoginFormType, RegisterFormType } from '../../../types/formsType';
import { errorHandler } from '../../../utils/errorHandler';
import { MyProfileSettingsType, UpdateMyProfileType } from '../../../types/entities/profileType';

export const login = createAsyncThunk(
  'auth/login',
  async (loginData: LoginFormType, { dispatch }) => {
    try {
      const response = await instance.post('auth/login', {
        ...loginData,
      });

      showTimeoutAlert(dispatch, {
        type: 'success',
        content: response.data.message,
      });

      if (!response.data.success) {
        const error: ErrorType = {
          status: response.data.status,
          message: response.data.message,
        };
        throw error;
      }

      localStorage.setItem('accessToken', response.data.data.access_token);

      return response.data.data;
    } catch (error) {
      errorHandler(error, dispatch);
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (registerData: Pick<RegisterFormType, 'repeatPassword'>, { dispatch }) => {
    try {
      if (registerData.repeatPassword) {
        delete registerData.repeatPassword;
      }

      const response = await instance.post('auth/register', {
        ...registerData,
      });

      showTimeoutAlert(dispatch, {
        type: 'success',
        content: response.data.message,
      });

      if (!response.data.success) {
        const error: ErrorType = {
          status: response.data.status,
          message: response.data.message,
        };
        throw error;
      }

      return response.data.success;
    } catch (error) {
      errorHandler(error, dispatch);
    }
  },
);

export const logout = createAsyncThunk('auth/logout ', async (_, { dispatch }) => {
  try {
    const response = await instance.post('auth/logout');

    localStorage.removeItem('accessToken');

    if (!response.data.success) {
      const error: ErrorType = {
        status: response.data.status,
        message: response.data.message,
      };
      throw error;
    }
  } catch (error) {
    errorHandler(error, dispatch);
  }
});

export const getMyProfile = createAsyncThunk('auth/getmyprofile ', async (_, { dispatch }) => {
  try {
    const response = await instance.get('profiles/me');

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
});

interface UpdateMyProfileThunkType {
  profile?: UpdateMyProfileType;
  settings?: Partial<MyProfileSettingsType>;
}

export const updateMyProfile = createAsyncThunk(
  'auth/updatemyprofile ',
  async ({ profile, settings }: UpdateMyProfileThunkType, { dispatch }) => {
    try {
      const response = await instance.put(`profiles`, {
        profile: {
          ...profile,
        },
        settings: {
          ...settings,
        },
      });

      if (!response.data.success) {
        const error: ErrorType = {
          status: response.data.status,
          message: response.data.message,
        };
        throw error;
      }

      showTimeoutAlert(dispatch, {
        type: 'success',
        content: response.data.message,
      });

      return {
        ...response.data.data,
        ...profile,
        ...settings,
      };
    } catch (error) {
      errorHandler(error, dispatch);
    }
  },
);

interface ChangePasswordThunkType {
  currentPassword: string;
  password: string;
}

export const changePassword = createAsyncThunk(
  'auth/updatemyprofile ',
  async ({ currentPassword, password }: ChangePasswordThunkType, { dispatch }) => {
    try {
      const response = await instance.post(`auth/changepassword`, {
        currentPassword,
        password,
      });

      if (!response.data.success) {
        const error: ErrorType = {
          status: response.data.status,
          message: response.data.message,
        };
        throw error;
      }

      showTimeoutAlert(dispatch, {
        type: 'success',
        content: response.data.message,
      });
    } catch (error) {
      errorHandler(error, dispatch);
    }
  },
);
