import { useMediaQuery } from 'react-responsive';

import AButton from '../../ui/AButton/AButton';
import AButtonSecondary from '../../ui/AButtonSecondary/AButtonSecondary';
import style from './Nav.module.scss';

const Nav = () => {
  const isMobile = useMediaQuery({ maxWidth: 700 });

  if (isMobile) return;

  return (
    <nav className={style.nav}>
      <div className={style.nav__links}>
        <AButton to="/" isMaxWidth={true}>
          Статьи
        </AButton>
        <AButton to="/profile" isMaxWidth={true}>
          Профиль
        </AButton>
        <AButton to="/settings" isMaxWidth={true}>
          Настройки
        </AButton>
      </div>

      <div className={style.nav__footer}>
        <AButton to="/info" isMaxWidth={true}>
          Информация
        </AButton>
        <AButtonSecondary to="/article-creator">+</AButtonSecondary>
      </div>
    </nav>
  );
};

export default Nav;
