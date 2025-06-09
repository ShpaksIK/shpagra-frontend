import React from 'react';
import { Link } from 'react-router';

import Button from '../../ui/Button/Button';
import ButtonSecondary from '../../ui/ButtonSecondary/ButtonSecondary';
import Avatar from '../../ui/Avatar/Avatar';

import style from './ProfilePreview.module.scss';

interface ProfilePreviewProps {
  profileAvatar: string;
  profileName: string;
  profileId: string;
  isSubscribed: boolean;
}

const ProfilePreview: React.FC<ProfilePreviewProps> = ({
  profileAvatar,
  profileName,
  profileId,
  isSubscribed,
}) => {
  return (
    <div className={style.profilePreview}>
      <div className={style.profilePreview__info}>
        <Avatar profileAvatar={profileAvatar} profileId={profileId} />
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
        {isSubscribed ? <ButtonSecondary text="Отписаться" /> : <Button text="Подписаться" />}
      </div>
    </div>
  );
};

export default ProfilePreview;
