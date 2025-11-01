import classNames from 'classnames';

import style from './HeaderDesktop.module.scss';
import logoIMG from './../../../public/img/logo.png';
import Logo from '../../ui/Logo/Logo';
import Input from '../../ui/Input/Input';
import IconLink from '../../ui/IconLink/IconLink';
import UserSVG from '../../ui/svg/UserSVG';
import SettingsSVG from '../../ui/svg/SettingsSVG';

const HeaderDesktop = () => {
  return (
    <header className={classNames('container', style.header)}>
      <div className={style.header__logo}>
        <Logo to="/">
          <img src={logoIMG} alt="Логотип" title="На главную" />
        </Logo>
      </div>
      <div className={style.header__search}>
        <Input placeholder="Найти статью..." isMaxWidth={true} />
      </div>
      <div className={style.header__nav}>
        <IconLink to="/settings" text="Настройки" icon={<SettingsSVG />} />
        <IconLink to="/profile" text="Профиль" icon={<UserSVG />} />
      </div>
    </header>
  );
};

export default HeaderDesktop;
