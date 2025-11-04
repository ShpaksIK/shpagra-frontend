import React from 'react';
import { Link } from 'react-router';

import style from './ReplyMessage.module.scss';

interface ReplyMessageProps {
  id: number;
  authorUsername: string;
  text: string;
}

const ReplyMessage: React.FC<ReplyMessageProps> = ({ id, authorUsername, text }) => {
  text = text.slice(0, 10) + '...';
  
  return (
    <Link to={`#${id}`} className={style.reply}>
      <p className={style.reply__author}>{authorUsername}</p>
      <p className={style.reply__text}>{text}</p>
    </Link>
  );
};

export default ReplyMessage;
