import React from 'react'
import { Link } from 'react-router'

import Button from '../Button/Button'
import ButtonSecondary from '../ButtonSecondary/ButtonSecondary';
import Avatar from '../Avatar/Avatar'

import style from './ProfilePreview.module.scss'


interface ProfilePreviewProps {
    profileAvatar: string
    profileName: string
    profileId: string
    isSubscribed: boolean
}

const ProfilePreview: React.FC<ProfilePreviewProps> = ({ profileAvatar, profileName, profileId, isSubscribed }) => {
    return (
        <div className={style.profilePreview}>
            <div className={style.profilePreview__info}>
                <Link to={`/profile/${profileId}`}>
                    <Avatar profileAvatar={profileAvatar} profileId={profileId} />
                </Link>
                <div className={style.profilePreview__name}>
                    <Link to={`/profile/${profileId}`}>
                        <b className={style.profilePreview__name}>{profileName}</b>
                    </Link>
                    <Link to={`/profile/${profileId}`}>
                        <p className={style.profilePreview__id}>{profileId}</p>
                    </Link>
                </div>
            </div>
            <div className={style.profilePreview__action}>
                {isSubscribed ? <ButtonSecondary text='Отписаться' /> : <Button text='Подписаться' />}
            </div>
        </div>
    )
}

export default ProfilePreview