import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'

import style from './AButton.module.scss'


interface AButtonProps {
    to: string
    text: string
    isMaxWidth?: boolean
}

const AButton: React.FC<AButtonProps> = ({ to, text, isMaxWidth = false }) => {
    return (
        <Link className={classNames(
            style.aButton,
            isMaxWidth ? 'max-width' : ''
        )} to={to}>{text}</Link>
    )
}

export default AButton