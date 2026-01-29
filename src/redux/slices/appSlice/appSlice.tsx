import { createSlice } from '@reduxjs/toolkit';
import { AlertType } from '../../../types/alertType';
import { testFetch } from './api';

interface AppState {
  initialized: boolean;
  alert: AlertType;
}

const initialState: AppState = {
  initialized: false,
  alert: {
    isExists: false,
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initializeApp: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(testFetch.pending, (state) => {
        state.alert = {
          isExists: true,
          content: 'Loading...',
          status: 0,
          type: 'info',
        };
      })
      .addCase(testFetch.fulfilled, (state, action) => {
        state.alert = {
          isExists: false,
        };
        console.log(action.payload);
      })
      .addCase(testFetch.rejected, (state, action) => {
        state.alert = {
          isExists: true,
          content: 'Error!',
          status: 400,
          type: 'error',
        };
      });
  },
});

export default appSlice.reducer;
