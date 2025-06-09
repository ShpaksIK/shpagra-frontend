import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

import Search from '../Search/Search';
import Dropdown from '../../ui/Dropdown/Dropdown';
import AButtonSecondary from '../../ui/AButtonSecondary/AButtonSecondary';
import ButtonSecondary from '../../ui/ButtonSecondary/ButtonSecondary';
import BurgerMenu from '../../ui/BurgerMenu/BurgerMenu';
import AButton from '../../ui/AButton/AButton';

import style from './HeaderMobile.module.scss';
import userIMG from './../../../public/images/user.png';
import Background from '../../ui/Background/Background';

interface HeaderMobileProps {
  isAuth: boolean;
  login: string;
  username: string;
  avatar: string;
  logout: () => void;
}

const HeaderMobile: React.FC<HeaderMobileProps> = ({ isAuth, login, username, avatar, logout }) => {
  const [isShowMenu, setShowMenu] = useState(false);
  const [isShowProfile, setShowProfile] = useState(false);

  return (
    <>
      <div className={classNames(style.header__inner)}>
        <div className={style.header__burger}>
          <BurgerMenu onClick={() => setShowMenu(!isShowMenu)} />
        </div>
        <div className={style.header__search}>
          <Search />
        </div>
        <div className={style.header__profile}>
          {isAuth ? (
            <div className={style.header__profileAvatar}>
              <div className={style.header__avatar} onClick={() => setShowProfile(true)}>
                <img src={avatar ? avatar : userIMG} alt="Фото профиля" draggable={false} />
              </div>
              {isShowProfile && (
                <Dropdown dropdownClose={() => setShowProfile(false)} isShowCloseImg={true}>
                  <div className={style.dropdown}>
                    <div className={style.dropdown__info}>
                      <img src={avatar ? avatar : userIMG} alt="Фото профиля" draggable={false} />
                      <div className={style.dropdown__text}>
                        <b className={style.dropdown__title}>{username}</b>
                        <p className={style.dropdown__login}>{login}</p>
                      </div>
                    </div>
                    <div className={style.dropdown__links}>
                      <AButtonSecondary to={`/profile/${login}`} text="В профиль" />
                      <AButtonSecondary to="/" text="Редактировать" />
                      <ButtonSecondary text="Выйти" onClick={() => logout()} isDanger={true} />
                    </div>
                  </div>
                </Dropdown>
              )}
            </div>
          ) : (
            <div className={style.header__profileButton}>
              <AButton to="/login" text="Войти" />
            </div>
          )}
        </div>
      </div>
      {isShowMenu && (
        <>
          <Background onClick={() => setShowMenu(!isShowMenu)} />
          <nav className={style.header__nav}>
            <div className={style.header__navHeader}></div>
            <Link className={style.header__link} to={isAuth ? '/profile' : '/login'}>
              Профиль
            </Link>
            <Link className={style.header__link} to="/">
              Лента
            </Link>
            <Link className={style.header__link} to="/friends">
              Друзья
            </Link>
            <Link className={style.header__link} to="/posts">
              Посты друзей
            </Link>
            <Link className={style.header__link} to={isAuth ? '/article-creator' : '/login'}>
              Написать статью
            </Link>
            <Link className={style.header__link} to="/info">
              Информация
            </Link>
          </nav>
        </>
      )}
    </>
  );
};

export default HeaderMobile;
