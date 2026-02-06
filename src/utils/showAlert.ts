import { Dispatch } from '@reduxjs/toolkit';
import { setAlert } from '../redux/slices/appSlice/appSlice';
import { AlertType } from '../types/alertType';

export const showTimeoutAlert = (dispatch: Dispatch, alert: AlertType) => {
  dispatch(setAlert(alert));

  setTimeout(() => {
    dispatch(setAlert(null));
  }, 5000);
};
