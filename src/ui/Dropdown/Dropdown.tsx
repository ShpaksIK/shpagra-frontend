import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

import style from './Dropdown.module.scss'
import closeSVG from './../../../public/svg/close.svg'


interface DropdownProps {
    isShowCloseImg?: boolean
    dropdownClose?: () => void
    children: React.ReactNode
}

const Dropdown: React.FC<DropdownProps> = ({ isShowCloseImg = false, dropdownClose, children }) => {
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                dropdownClose?.()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [dropdownClose])

    return (
        <motion.div
        ref={dropdownRef}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.1}}
        className={style.dropdown}>
            {isShowCloseImg && (
                <button className={style.dropdown__close} onClick={dropdownClose}>
                    <img className={style.dropdown__image} src={closeSVG} />
                </button>
            )}
            {children}
        </motion.div>
    )
}

export default Dropdown