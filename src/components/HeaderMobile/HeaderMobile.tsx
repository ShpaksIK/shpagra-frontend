import React, { useState } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'

import Search from '../Search/Search'

import style from './HeaderMobile.module.scss'
import logoIMG from './../../../public/images/logo-mini.png'
import BurgerMenu from '../../ui/BurgerMenu/BurgerMenu'


interface HeaderMobileProps {
    isAuth: boolean
    login: string
    username: string
    avatar: string
    logout: () => void
}

const HeaderMobile: React.FC<HeaderMobileProps> = ({ isAuth, login, username, avatar, logout }) => {
    const [isShowMenu, setShowMenu] = useState(false)

    return (
        <div className={classNames(style.header__inner)}>
            <div className={style.header__logo}>
                <Link to='/'><img src={logoIMG} alt='Логотип' draggable={false} /></Link>
            </div>
            <div className={style.header__search}>
                <Search />
            </div>
            <div className={style.header__burger}>
                <BurgerMenu onClick={() => setShowMenu(true)} />
            </div>
        </div>
    )
}

export default HeaderMobile