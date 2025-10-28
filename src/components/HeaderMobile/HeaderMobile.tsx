import { useState } from 'react';

import style from './HeaderMobile.module.scss';
import Input from '../../ui/Input/Input';
import NavMobile from '../NavMobile/NavMobile';
import BurgerMenu from '../../ui/BurgerMenu/BurgerMenu';

const HeaderMobile = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const toggleMenu = () => setIsOpenMenu(prev => !prev);

  return (
    <>
      <header className={style.header}>
        <div className={style.header__search}>
          <Input placeholder="Найти статью..." isMaxWidth={true} />
        </div>
        <div className={style.header__nav}>
          <BurgerMenu onClick={toggleMenu} />
        </div>
      </header>
      {isOpenMenu && (
        <NavMobile />
      )}
    </>
  );
};

export default HeaderMobile;
