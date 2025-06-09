import React from 'react';
import { connect } from 'react-redux';

import Button from '@mui/material/Button';

import style from './Nav.module.scss';
import { AppStateType } from '../../redux';

interface StateProps {
  isAuth: boolean;
}

type NavProps = StateProps;

const Nav: React.FC<NavProps> = (props) => {
  return (
    <nav className={style.nav}>
      <Button href={props.isAuth ? '/profile' : '/login'} variant="contained">
        Профиль
      </Button>
      <Button href="/" variant="contained">
        Лента
      </Button>
      <Button href="/friends" variant="contained">
        Друзья
      </Button>
      <Button href="/posts" variant="contained">
        Посты друзей
      </Button>
      <Button href={props.isAuth ? '/article-creator' : '/login'} variant="contained">
        Написать статью
      </Button>
      <Button href="/info" variant="contained">
        Информация
      </Button>
    </nav>
  );
};

const mapState = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapState)(Nav);
