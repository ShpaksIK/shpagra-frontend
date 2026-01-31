import { Dispatch } from '@reduxjs/toolkit';
import { setAlert } from '../redux/slices/appSlice/appSlice';
import { AlertType } from '../types/alertType';

export const showTimeoutAlert = (dispatch: Dispatch, error: AlertType) => {
  console.log(error);

  dispatch(setAlert(error));

  setTimeout(() => {
    dispatch(setAlert(null));
  }, 3000);
};
