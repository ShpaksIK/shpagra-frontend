import React from 'react'
import { connect } from 'react-redux'

import HeaderDesktop from '../HeaderDesktop/HeaderDesktop'

import style from './HeaderContainer.module.scss'
import { AppStateType } from '../../redux'


interface StateProps {
    isAuth: boolean
    login: string
    username: string
    avatar: string
}

type HeaderContainerProps = StateProps

const HeaderContainer: React.FC<HeaderContainerProps> = (props) => {
    const screenWidth = window.innerWidth
    
    return (
        <header className={style.header}>
            {screenWidth > 700 && (
                <HeaderDesktop {...props} />
            )}
            {screenWidth <= 700 && (
                <></>
            )}
        </header>
    )
}

const mapState = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        username: state.auth.username,
        login: state.auth.login,
        avatar: state.auth.avatar,
    }
}

export default connect(mapState, null)(HeaderContainer)