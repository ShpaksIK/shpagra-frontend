import React, { useState } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'

import AButtonSecondary from '../../ui/AButtonSecondary/AButtonSecondary'
import Dropdown from '../../ui/Dropdown/Dropdown'
import Search from '../Search/Search'
import Notifications from '../Notifications/Notifications'

import style from './HeaderDesktop.module.scss'
import logoIMG from './../../../public/images/logo-big.png'
import userIMG from './../../../public/images/user.png'
import arrowSVG from './../../../public/svg/arrow.svg'
import ButtonSecondary from '../../ui/ButtonSecondary/ButtonSecondary'


interface HeaderDesktopProps {
    isAuth: boolean
    login: string
    username: string
    avatar: string
}

const HeaderDesktop: React.FC<HeaderDesktopProps> = ({ isAuth, login, username, avatar }) => {
    const [isShowProfile, setShowProfile] = useState(false)

    return (
        <div className={classNames(style.header__inner, 'container')}>
            <div className={style.header__logo}>
                <Link to='/'><img src={logoIMG} alt='Логотип' draggable={false} /></Link>
            </div>
            <div className={style.header__search}>
                <Search />
                <Notifications />
            </div>
            <div className={style.header__actions}>
                <div className={style.header__profile}>
                    {isAuth ? (
                        <>
                            <div className={style.profile} onClick={() => setShowProfile(true)}>
                                <div className={style.profile__avatar}>
                                    <img src={avatar ? avatar : userIMG} alt='Фото профиля' draggable={false} />
                                </div>
                                <div className={style.profile__arrow}>
                                    <img src={arrowSVG} alt='Информация' />
                                </div>
                                {isShowProfile && (
                                    <Dropdown dropdownClose={() => setShowProfile(false)}>
                                        <div className={style.dropdown}>
                                            <b className={style.dropdown__title}>{username}</b>
                                            <p className={style.dropdown__login}>{login}</p>
                                            <div className={style.dropdown__links}>
                                                <AButtonSecondary to={`/profile/${login}`} text='В профиль' />
                                                <AButtonSecondary to='/' text='Редактировать' />
                                                <ButtonSecondary text='Выйти' isDanger={true} />
                                            </div>
                                        </div>
                                    </Dropdown>
                                )}
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HeaderDesktop