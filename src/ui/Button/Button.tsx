import React from 'react'
import classNames from 'classnames'

import style from './Button.module.scss'


interface ButtonProps {
    text: string
    onClick?: () => void
    isMaxWidth?: boolean
}

const Button: React.FC<ButtonProps> = ({ text, onClick, isMaxWidth = false }) => {
    return (
        <button type='button' className={classNames(
            style.button,
            isMaxWidth ? 'max-width' : ''
        )} onClick={onClick}>{text}</button>
    )
}

export default Button