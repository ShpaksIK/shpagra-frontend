import React from 'react';
import { Link } from 'react-router';

import style from './Avatar.module.scss';
import userIMG from './../../../public/img/user.png';

interface AvatarProps {
  profileAvatar: string | null;
  profileId: string;
  username?: string;
}

const Avatar: React.FC<AvatarProps> = ({ profileAvatar, profileId, username }) => {
  return (
    <Link className={style.avatar} to={`/profile/${profileId}`}>
      <img className={style.avatar__image} src={profileAvatar ? profileAvatar : userIMG} />
      {username && <p className={style.avatar__username}>{username}</p>}
    </Link>
  );
};

export default Avatar;
