import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyProfileType } from '../../../types/entities/profileType';
import { getMyProfile, login, logout, register, updateMyProfile } from './api';

/*
  profile - профиль пользователя, если авторизован
  initialized - состояние до и после попытки авторизации (false - до, true - после)
  loadings - данные о состояниях загрузки приложения
*/
type LoadingType = {
  isLoading: boolean;
  isSuccess: boolean;
  isDone: boolean;
};
interface AuthState {
  profile: MyProfileType | null;
  initialized: boolean;
  loadings: {
    auth: LoadingType;
  };
}

const initialState: AuthState = {
  profile: null,
  initialized: false,
  loadings: {
    auth: {
      isLoading: false,
      isSuccess: false,
      isDone: false,
    },
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setInitialized: (state) => {
      state.initialized = true;
    },
    resetAuthLoading: (state) => {
      state.loadings.auth = {
        isLoading: false,
        isSuccess: false,
        isDone: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loadings.auth.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload) {
        state.loadings.auth.isSuccess = true;
      }
      state.loadings.auth.isDone = true;
      state.loadings.auth.isLoading = false;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.profile = null;
    });
    builder.addCase(getMyProfile.fulfilled, (state, action: PayloadAction<MyProfileType>) => {
      state.initialized = true;
      state.loadings.auth.isDone = true;
      if (!action.payload) return;
      state.profile = action.payload;
      state.profile.avatar = null;
      state.profile.articles = [];
      state.profile.comments = [];
      state.profile.reactions = [];
    });
    builder.addCase(getMyProfile.rejected, (state) => {
      state.initialized = true;
    });
    builder.addCase(updateMyProfile.fulfilled, (state, action: PayloadAction<MyProfileType>) => {
      if (state.profile) {
        state.profile = {
          ...state.profile,
          ...action.payload,
        };
      }
    });
    builder.addCase(register.pending, (state) => {
      state.loadings.auth.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      if (action.payload) {
        state.loadings.auth.isSuccess = true;
      }
      state.loadings.auth.isLoading = false;
    });
  },
});

export const { resetAuthLoading } = authSlice.actions;

export default authSlice.reducer;
