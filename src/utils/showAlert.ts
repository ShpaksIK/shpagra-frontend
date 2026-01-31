import { Dispatch } from '@reduxjs/toolkit';
import { setAlert } from '../redux/slices/appSlice/appSlice';
import { AlertType } from '../types/alertType';

export const showTimeoutAlert = (dispatch: Dispatch, error: AlertType) => {
  dispatch(setAlert(error));
  
  setTimeout(() => {
    dispatch(setAlert(null));
  }, 5000);
};
