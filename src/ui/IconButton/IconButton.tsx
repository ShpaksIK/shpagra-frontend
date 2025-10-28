import React from 'react';
import { Link } from 'react-router';

import style from './IconButton.module.scss';

interface IconButtonProps {
  to: string;
  icon: React.ReactNode;
  text?: string;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ to, text, icon }) => {
  return (
    <Link className={style.iconButton} to={to}>
      {icon}
      <div className={style.iconButton__text}>
        <p>{text}</p>
      </div>
    </Link>
  );
};

export default IconButton;
