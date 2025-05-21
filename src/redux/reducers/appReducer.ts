import { Action } from '../types/actionType'


enum appReducerConsts {
    INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'
}

interface DefaultState {
    initialized: boolean
}

let defaultState: DefaultState = {
    initialized: false,
}

// ======== Reducer ========
const appReducer = (state = defaultState, action: Action) => {
    switch (action.type) {
        case appReducerConsts.INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

// ======== Action creators (AC) ========
export const initializedSuccessAC = (): Action => ({type: appReducerConsts.INITIALIZED_SUCCESS})

// ======== Thunks ========
export const initializeApp = () => async (dispatch: any) => {
    Promise.all([]).then(() => {
        dispatch(initializedSuccessAC())
    })
}

export default appReducer