import { Action } from '../types/actionType'
import { AuthSchema } from '../types/authStateSchema'


enum appReducerConsts {
    SET_AUTH = 'SET_AUTH'
}

interface DefaultState {
    isAuth: boolean
    login: string | null
    username: string | null
    avatar: string | null
    email: string | null
}

let defaultState: DefaultState = {
    isAuth: false,
    login: null,
    username: null,
    avatar: null,
    email: null
}

// ======== Reducer ========
const authReducer = (state = defaultState, action: Action) => {
    switch (action.type) {
        case appReducerConsts.SET_AUTH:
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }
        default:
            return state
    }
}

// ======== Action creators (AC) ========
export const setAuthAC = (authData: AuthSchema): Action => ({
    type: appReducerConsts.SET_AUTH,
    payload: authData
})

// ======== Thunks ========
export const auth = () => async (dispatch: any) => {
    const authData: AuthSchema = {
        login: 'shp0ks',
        username: 'Shpaks',
        avatar: '',
        email: 'test-mail@mail.ru'
    }
    dispatch(setAuthAC(authData))
}

export default authReducer