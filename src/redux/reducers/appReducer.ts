import { Action } from '../types/actionType';
import { AlertType } from '../types/alertType';

enum appReducerConsts {
  INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS',
  SWITCH_SEND_COMMENT_LOADING = 'SWITCH_SEND_COMMENT_LOADING',
  SET_ALERT = 'SET_ALERT',
}

interface DefaultState {
  initialized: boolean;
  sendCommentLoading: boolean;
  alert: AlertType;
}

let defaultState: DefaultState = {
  initialized: false,
  sendCommentLoading: false,
  alert: {
    isExists: false,
  },
};

// ======== Reducer ========
const appReducer = (state = defaultState, action: Action) => {
  switch (action.type) {
    case appReducerConsts.INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    case appReducerConsts.SWITCH_SEND_COMMENT_LOADING:
      return {
        ...state,
        sendCommentLoading: action.payload,
      };
    case appReducerConsts.SET_ALERT:
      return {
        ...state,
        alert: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

// ======== Action creators (AC) ========
export const initializedSuccessAC = (): Action => ({
  type: appReducerConsts.INITIALIZED_SUCCESS,
});

export const switchSendCommentLoadingAC = (newStatus: boolean): Action => ({
  type: appReducerConsts.SWITCH_SEND_COMMENT_LOADING,
  payload: newStatus,
});

export const setAlertAC = (newAlert: AlertType): Action => ({
  type: appReducerConsts.SET_ALERT,
  payload: newAlert,
});

// ======== Thunks ========
export const initializeApp = () => async (dispatch: any) => {
  Promise.all([]).then(() => {
    dispatch(initializedSuccessAC());
  });
};

export const switchSendCommentLoading = (newStatus: boolean) => async (dispatch: any) => {
  dispatch(switchSendCommentLoadingAC(newStatus));
};

export const setAlert =
  (newAlert: AlertType, time: number = 5000) =>
  async (dispatch: any) => {
    dispatch(
      setAlertAC({
        ...newAlert,
        isExists: true,
      }),
    );
    setTimeout(() => {
      dispatch(
        setAlertAC({
          isExists: false,
        }),
      );
    }, time);
  };

export default appReducer;
