import React, { useState } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import Dropdown from '../../ui/Dropdown/Dropdown'

import style from './Notifications.module.scss'
import { AppStateType } from '../../redux'
import { Notification } from '../../redux/types/authStateSchema'
import { setNotificationRead } from '../../redux/reducers/authReducer'
import notificationSVG from './../../../public/svg/notification.svg'
import arrowSVG from './../../../public/svg/arrow.svg'
import NotificationPreview from '../NotificationPreview/NotificationPreview'


interface StateProps {
    notifications: Notification[]
}

interface DispatchProps {
    setNotificationRead: (notificationId: number) => void
}

type NotificationsProps = StateProps & DispatchProps

const Notifications: React.FC<NotificationsProps> = (props) => {
    const [isDropdownShow, setDropdownShow] = useState(false)
    const [notificationShow, setNotificationShow] = useState<Notification | null>(null)

    const handleDropdownShow = () => {
        setDropdownShow(false)
        setNotificationShow(null)
    }

    return (
        <div className={style.notifications}>
            <div className={style.notifications__button} onClick={() => setDropdownShow(true)}>
                <img src={notificationSVG} alt='Уведомления' />
            </div>
            {isDropdownShow && (
                <Dropdown isShowCloseImg={notificationShow ? false : true} dropdownClose={() => handleDropdownShow()}>
                    <div className={style.dropdown}>
                        {!notificationShow && (
                            <>
                            <b className={style.dropdown__title}>Уведомления</b>
                            <div className={style.dropdown__list}>
                                {props.notifications.map(notification => (
                                    <div className={style.dropdown__item} key={notification.notificationId}>
                                        <div className={style.dropdown__itemText}>
                                            <b>
                                                {notification.type === 'article' && 'Статья...'}
                                                {notification.type === 'post' && 'Пост...'}
                                                {notification.type === 'profile' && 'Профиль...'}
                                                {notification.type === 'some' && 'Уведомление...'}
                                            </b>
                                            <p className={classNames(notification.isRead ? style.dropdown__itemText_read : style.dropdown__itemText_noread)}>
                                                {notification.isRead ? 'Прочитано' : 'Не прочитано'}
                                            </p>
                                            <p className={style.dropdown__createdAt}>{notification.createdAt}</p>
                                        </div>
                                        <button className={style.dropdown__itemButton} onClick={() => setNotificationShow(notification)}>
                                            <img src={arrowSVG} alt='Подробнее' /> 
                                        </button>
                                    </div>
                                ))}
                                {props.notifications.length === 0 && (
                                    <p className={style.dropdown__error}>У вас нет уведомлений</p>
                                )}
                            </div>
                            </>
                        )}
                        {notificationShow && (
                            <NotificationPreview 
                                notification={notificationShow} 
                                onClick={() => setNotificationShow(null)} 
                            />
                        )}
                    </div>
                </Dropdown>
            )}
        </div>
    )
}

const mapState = (state: AppStateType) => {
    return {
        notifications: state.auth.notifications
    }
}

const mapDispatch = {setNotificationRead}

export default connect(mapState, mapDispatch)(Notifications)