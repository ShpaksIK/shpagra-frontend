import A from '../../ui/A/A';
import Line from '../../ui/Line/Line';
import style from './NavMobile.module.scss';

const NavMobile = () => {
  return (
    <nav className={style.nav}>
      <A to='/profile'>Профиль</A>
      <Line />
      <A to='/settings'>Настройки</A>
    </nav>
  );
};

export default NavMobile;
