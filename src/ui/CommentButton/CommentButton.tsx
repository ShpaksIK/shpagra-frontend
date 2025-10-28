import React from 'react';
import classNames from 'classnames';

import ChatIcon from '@mui/icons-material/Chat';

import style from './CommentButton.module.scss';

interface CommentButtonProps {
  isOpen: boolean;
  onClick: any;
}

const CommentButton: React.FC<CommentButtonProps> = ({ isOpen, onClick }) => {
  return (
    <div
      className={classNames(style.commentButton, isOpen ? style.commentButton_active : '')}
      onClick={onClick}
    >
      <ChatIcon color="primary" />
    </div>
  );
};

export default CommentButton;
