import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../../api';
import { ErrorType } from '../../../types/errorType';
import { showTimeoutAlert } from '../../../utils/showAlert';
import { LoginFormType, RegisterFormType } from '../../../types/formsType';
import { errorHandler } from '../../../utils/errorHandler';
import { UpdateMyProfileType } from '../../../types/entities/profileType';

export const login = createAsyncThunk(
  'auth/login',
  async (loginData: LoginFormType, { dispatch }) => {
    try {
      const response = await instance.post('auth/login', {
        ...loginData,
      });

      showTimeoutAlert(dispatch, {
        type: 'success',
        content: 'Успешный вход',
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
      errorHandler(error, dispatch);
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (registerData: RegisterFormType, { dispatch }) => {
    try {
      const response = await instance.post('auth/registration', {
        ...registerData,
      });

      showTimeoutAlert(dispatch, {
        type: 'success',
        content: 'Успешная регистрация',
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
      errorHandler(error, dispatch);
    }
  },
);

export const logout = createAsyncThunk('auth/logout ', async (_, { dispatch }) => {
  try {
    const response = await instance.get('auth/logout');

    if (response.status >= 400) {
      const error: ErrorType = {
        status: response.status,
        message: response.statusText,
      };
      throw error;
    }

    return response.data;
  } catch (error) {
    errorHandler(error, dispatch);
  }
});

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
    errorHandler(error, dispatch);
  }
});

interface UpdateMyProfileThunkType {
  profile: UpdateMyProfileType;
  login: string;
}

export const updateMyProfile = createAsyncThunk(
  'auth/updatemyprofile ',
  async ({ profile, login }: UpdateMyProfileThunkType, { dispatch }) => {
    try {
      const response = await instance.put(`profile/${login}`, {
        ...profile,
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
        content: 'Профиль изменен',
      });

      return response.data;
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
      const response = await instance.put(`auth/changepassword`, {
        currentPassword,
        password,
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
        content: 'Пароль изменен',
      });

      return response.data;
    } catch (error) {
      errorHandler(error, dispatch);
    }
  },
);
