import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertType } from '../../../types/alertType';
import { testFetch } from './api';

interface AppState {
  initialized: boolean;
  alert: AlertType | null;
}

const initialState: AppState = {
  initialized: false,
  alert: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<AlertType | null>) => {
      state.alert = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(testFetch.pending, (state) => {})
      .addCase(testFetch.fulfilled, (state, action) => {})
      .addCase(testFetch.rejected, (state, action) => {});
  },
});

export const { setAlert } = appSlice.actions;

export default appSlice.reducer;
