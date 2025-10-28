import React from 'react';
import { Link } from 'react-router';

import style from './Avatar.module.scss';
import userIMG from './../../../public/img/test.png';

interface AvatarProps {
  profileAvatar: string;
  profileId: string;
}

const Avatar: React.FC<AvatarProps> = ({ profileAvatar, profileId }) => {
  return (
    <Link to={`/profile/${profileId}`}>
      <img className={style.avatar} src={profileAvatar ? profileAvatar : userIMG} />
    </Link>
  );
};

export default Avatar;
