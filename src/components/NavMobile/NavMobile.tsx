import { useAuth } from '../../hooks/useAuth';
import A from '../../ui/A/A';
import Line from '../../ui/Line/Line';
import style from './NavMobile.module.scss';

const NavMobile = () => {
  const profile = useAuth();

  return (
    <nav className={style.nav}>
      <A to="/">Статьи</A>
      <Line />
      {profile && (
        <>
          <A to="/profile">Профиль</A>
          <Line />
          <A to="/settings">Настройки</A>
        </>
      )}
      {!profile && <A to="/sign-in">Войти</A>}
    </nav>
  );
};

export default NavMobile;
