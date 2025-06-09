import React from 'react';
import classNames from 'classnames';

import style from './NotificationPreview.module.scss';
import arrowSVG from './../../../public/svg/arrow.svg';
import { Notification } from '../../redux/types/authStateSchema';
import A from '../../ui/A/A';

interface NotificationPreviewProps {
  notification: Notification;
  onClick: () => void;
}

const NotificationPreview: React.FC<NotificationPreviewProps> = ({ notification, onClick }) => {
  return (
    <div className={style.notificationPreview}>
      <div className={style.notificationPreview__header}>
        <b className={style.notificationPreview__title}>
          {notification.type === 'article' && 'Статья...'}
          {notification.type === 'post' && 'Пост...'}
          {notification.type === 'profile' && 'Профиль...'}
          {notification.type === 'some' && 'Уведомление...'}
        </b>
        <button className={style.notificationPreview__button} onClick={() => onClick()}>
          <img src={arrowSVG} alt="Назад" />
        </button>
      </div>
      <p className={style.notificationPreview__content}>{notification.content}</p>
      <div className={style.notificationPreview__footer}>
        {notification.type === 'article' && (
          <A to={`/article/${notification.relatedId}`} text="Перейти" />
        )}
        {notification.type === 'post' && (
          <A to={`/post/${notification.relatedId}`} text="Перейти" />
        )}
        {notification.type === 'profile' && (
          <A to={`/profile/${notification.relatedId}`} text="Перейти" />
        )}
        <p className={style.notificationPreview__createdAt}>{notification.createdAt}</p>
      </div>
    </div>
  );
};

export default NotificationPreview;
