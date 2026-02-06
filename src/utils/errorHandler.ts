import { AxiosError } from 'axios';
import { ErrorType } from '../types/errorType';
import { showTimeoutAlert } from './showAlert';
import { Dispatch } from '@reduxjs/toolkit';

export const errorHandler = (error: unknown, dispatch: Dispatch) => {
  if (error instanceof AxiosError) {
    if (error.response?.data instanceof ErrorType) {
      showTimeoutAlert(dispatch, {
        content: error.response.data.message,
        status: error.response.data.status,
        type: 'error',
      });
      return;
    }

    showTimeoutAlert(dispatch, {
      content: 'Возникла внутренняя ошибка системы',
      status: error.status || 500,
      type: 'error',
    });
    return;
  }
};
