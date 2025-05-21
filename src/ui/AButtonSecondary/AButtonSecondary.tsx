import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'

import style from './AButtonSecondary.module.scss'


interface AButtonSecondaryProps {
    to: string
    text: string
    isMaxWidth?: boolean
}

const AButtonSecondary: React.FC<AButtonSecondaryProps> = ({ to, text, isMaxWidth = false }) => {
    return (
        <Link className={classNames(
            style.aButtonSecondary,
            isMaxWidth ? 'max-width' : ''
        )} to={to}>{text}</Link>
    )
}

export default AButtonSecondary