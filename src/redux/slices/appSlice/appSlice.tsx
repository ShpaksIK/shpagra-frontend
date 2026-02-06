import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertType } from '../../../types/alertType';

/*
  alert - состояние пользовательского уведомления
*/
interface AppState {
  alert: AlertType | null;
}

const initialState: AppState = {
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
});

export const { setAlert } = appSlice.actions;

export default appSlice.reducer;
