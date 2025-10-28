import { Action } from '../../types/reduxType';
import { AlertType } from '../../types/alertType';

enum appReducerConsts {
  INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS',
  SET_ALERT = 'SET_ALERT',
  SWITCH_LOADING = 'SWITCH_LOADING'
}

type LoadingTypes = 'sendCommentLoading' | 'commentsLoading' | 'handleReactionLoading';

interface LoadingStates {
  sendCommentLoading: boolean;
  commentsLoading: boolean;
  handleReactionLoading: boolean;
}

interface DefaultState {
  initialized: boolean;
  alert: AlertType;
  loading: LoadingStates;
}

const defaultState: DefaultState = {
  initialized: false,
  alert: {
    isExists: false,
  },
  loading: {
    sendCommentLoading: false,
    commentsLoading: false,
    handleReactionLoading: false
  }
};

// ======== Reducer ========
const appReducer = (state = defaultState, action: Action) => {
  switch (action.type) {
    case appReducerConsts.INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    case appReducerConsts.SWITCH_LOADING:
      return {
        ...state,
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
const initializedSuccessAC = (): Action => ({
  type: appReducerConsts.INITIALIZED_SUCCESS,
});

const switchLoadingAC = (loadingType: LoadingTypes, newStatus: boolean): Action => ({
  type: appReducerConsts.SWITCH_LOADING,
  payload: {
    loadingType,
    newStatus
  },
});

const setAlertAC = (newAlert: AlertType): Action => ({
  type: appReducerConsts.SET_ALERT,
  payload: newAlert,
});

// ======== Thunks ========
export const initializeApp = () => async (dispatch: any) => {
  Promise.all([]).then(() => {
    dispatch(initializedSuccessAC());
  });
};

export const switchLoading = (loadingType: LoadingTypes, newStatus: boolean) => async (dispatch: any) => {
  dispatch(switchLoadingAC(loadingType, newStatus));
};

export const setAlert = (newAlert: AlertType, time: number = 5000) => async (dispatch: any) => {
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
