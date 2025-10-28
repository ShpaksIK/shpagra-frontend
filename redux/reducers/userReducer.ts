import { Action } from '../../types/reduxType';
import { UserType } from '../../types/entities/userType';

enum userReducerConsts {
  SET_AUTH = 'SET_AUTH',
}

const defaultState: UserType = {
  isAuth: false,
  login: null,
  username: null,
  avatar: null
};

// ======== Reducer ========
const userReducer = (state = defaultState, action: Action) => {
  switch (action.type) {
    case userReducerConsts.SET_AUTH:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

// ======== Action creators (AC) ========
const setAuthAC = (authData: UserType): Action => ({
  type: userReducerConsts.SET_AUTH,
  payload: authData,
});

// ======== Thunks ========
export const auth = () => async (dispatch: any) => {
  const authData: UserType = {
    isAuth: true,
    login: 'shp0ks',
    username: 'Shpaks',
    avatar: null,
  };
  dispatch(setAuthAC(authData));
};

export const logout = () => async (dispatch: any) => {
  window.location.reload();
};

export default userReducer;
