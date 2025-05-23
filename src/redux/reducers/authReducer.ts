import { Action } from '../types/actionType'
import { AuthSchema, Notification } from '../types/authStateSchema'


enum authReducerConsts {
    SET_AUTH = 'SET_AUTH',
    SET_NOTIFICATIONS = 'SET_NOTIFICATIONS',
    SET_NOTIFICATION_READ = 'SET_NOTIFICATION_READ'
}

interface DefaultState {
    isAuth: boolean
    login: string | null
    username: string | null
    avatar: string | null
    email: string | null
    notifications: Notification[]
}

let defaultState: DefaultState = {
    isAuth: false,
    login: null,
    username: null,
    avatar: null,
    email: null,
    notifications: []
}

// ======== Reducer ========
const authReducer = (state = defaultState, action: Action) => {
    switch (action.type) {
        case authReducerConsts.SET_AUTH:
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }
        case authReducerConsts.SET_NOTIFICATIONS:
            return {
                ...state,
                notifications: [...action.payload]
            }
        case authReducerConsts.SET_NOTIFICATION_READ:
            const findNotification = [...state.notifications]
                .find(n => n.notificationId === action.payload)
            if (findNotification) {
                findNotification.isRead = true
            }
            return {
                ...state,
                notifications: [
                    ...state.notifications.filter(n => n.notificationId !== action.payload),
                    findNotification
                ]
            }
        default:
            return state
    }
}

// ======== Action creators (AC) ========
const setAuthAC = (authData: AuthSchema): Action => ({
    type: authReducerConsts.SET_AUTH,
    payload: authData
})

const setNotificationsAC = (notifications: Notification[]): Action => ({
    type: authReducerConsts.SET_NOTIFICATIONS,
    payload: notifications
})

const setNotificationReadAC = (notificationId: number): Action => ({
    type: authReducerConsts.SET_NOTIFICATION_READ,
    payload: notificationId
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

export const logout = () => async (dispatch: any) => {
    window.location.reload()
}

export const getNotifications = () => async (dispatch: any) => {
    const notifications: Notification[] = [{
        notificationId: 1,
        relatedId: 1,
        type: 'profile',
        content: 'Вы успешно вошли в аккаунт.',
        isRead: false,
        createdAt: '22.05.2025',
    }]
    dispatch(setNotificationsAC(notifications))
}

export const setNotificationRead = (notificationId: number) => async (dispatch: any) => {
    dispatch(setNotificationReadAC(notificationId))
}

export default authReducer