import React from 'react';

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

import style from './Like.module.scss';

interface LikeProps {
  isLike: boolean;
  onClick: any;
}

const Like: React.FC<LikeProps> = ({ isLike, onClick }) => {
  return (
    <div className={style.like} onClick={onClick}>
      {isLike ? <ThumbUpAltIcon color="error" /> : <ThumbUpOffAltIcon />}
    </div>
  );
};

export default Like;
