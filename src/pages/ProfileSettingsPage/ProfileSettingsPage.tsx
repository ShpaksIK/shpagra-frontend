import classNames from 'classnames';

import style from './ProfileSettingsPage.module.scss';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import { useProfile } from '../../hooks/useProfile';
import userIMG from './../../../public/img/user.png';
import IconButton from '../../ui/IconButton/IconButton';
import UserSVG from '../../ui/svg/UserSVG';
import Switch from '../../ui/Switch/Switch';
import { SettingsType } from '../../types/settingsType';
import TextButton from '../../ui/TextButton/TextButton';
import ButtonSecondary from '../../ui/ButtonSecondary/ButtonSecondary';
import Button from '../../ui/Button/Button';

const ProfileSettingsPage = () => {
  const profile = useProfile();

  const switchSetting = (checked: boolean, type: SettingsType) => {
    switch (type) {
      case 'visible-articles':
        break;
      case 'visible-comments':
        break;
      case 'visible-reactions':
        break;
    }
  };

  return (
    <>
      <Header />
      <div className={classNames('container', style.content)}>
        <Nav />
        <main className={style.content__inner}>
          <h2 className={style.content__inner__title}>Настройки профиля</h2>
          <div className={style.settings}>
            <div className={style.settings__info}>
              <img src={profile.avatar || userIMG} alt="Фото профиля" />
              <div className={style.settings__info__name}>
                <b>{profile.username}</b>
                <p>{profile.login}</p>
                <IconButton icon={<UserSVG />} onClick={() => {}} />
              </div>
            </div>

            <div className={style.settings__controls}>
              <div className={style.settings__controls__control}>
                <p>Отображать мои статьи</p>
                <Switch checked={false} type="visible-articles" onChange={switchSetting} />
              </div>
              <div className={style.settings__controls__control}>
                <p>Отображать мои комментарии</p>
                <Switch checked={false} type="visible-comments" onChange={switchSetting} />
              </div>
              <div className={style.settings__controls__control}>
                <p>Отображать мои реакции</p>
                <Switch checked={false} type="visible-reactions" onChange={switchSetting} />
              </div>
              <div className={style.settings__controls__control}>
                <p>Текущий пароль</p>
                <TextButton text="Изменить" onClick={() => {}} />
              </div>
            </div>

            <ButtonSecondary>Выйти</ButtonSecondary>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfileSettingsPage;
