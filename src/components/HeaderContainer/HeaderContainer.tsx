import React from 'react';
import { connect } from 'react-redux';

import HeaderDesktop from '../HeaderDesktop/HeaderDesktop';
import HeaderMobile from '../HeaderMobile/HeaderMobile';

import style from './HeaderContainer.module.scss';
import { AppStateType } from '../../redux';
import { logout } from '../../redux/reducers/authReducer';

interface StateProps {
  isAuth: boolean;
  login: string;
  username: string;
  avatar: string;
}

interface DispatchProps {
  logout: () => void;
}

type HeaderContainerProps = StateProps & DispatchProps;

const HeaderContainer: React.FC<HeaderContainerProps> = (props) => {
  const screenWidth = window.innerWidth;

  return (
    <header className={style.header}>
      {screenWidth > 700 && <HeaderDesktop {...props} />}
      {screenWidth <= 700 && <HeaderMobile {...props} />}
    </header>
  );
};

const mapState = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
    username: state.auth.username,
    login: state.auth.login,
    avatar: state.auth.avatar,
  };
};

export default connect(mapState, { logout })(HeaderContainer);
