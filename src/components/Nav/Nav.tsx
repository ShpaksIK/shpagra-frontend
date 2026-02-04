import { useMediaQuery } from 'react-responsive';

import AButton from '../../ui/AButton/AButton';
import AButtonSecondary from '../../ui/AButtonSecondary/AButtonSecondary';
import style from './Nav.module.scss';
import Block from '../../ui/Block/Block';

const Nav = () => {
  const isMobile = useMediaQuery({ maxWidth: 700 });

  if (isMobile) return;

  return (
    <nav className={style.nav}>
      <Block className={style.nav__inner}>
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
      </Block>
    </nav>
  );
};

export default Nav;
