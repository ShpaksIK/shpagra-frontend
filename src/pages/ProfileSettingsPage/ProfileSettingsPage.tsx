import style from './ProfileSettingsPage.module.scss';
import { useProfile } from '../../hooks/useProfile';
import userIMG from './../../../public/img/user.png';
import IconButton from '../../ui/IconButton/IconButton';
import Switch from '../../ui/Switch/Switch';
import { SettingsType } from '../../types/settingsType';
import TextButton from '../../ui/TextButton/TextButton';
import ButtonSecondary from '../../ui/ButtonSecondary/ButtonSecondary';
import ProfileLoading from '../../components/ProfileLoading/ProfileLoading';
import LayoutBase from '../../components/Layouts/LayoutBase/LayoutBase';
import Block from '../../ui/Block/Block';
import EditSVG from '../../ui/svg/EditSVG';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import { useState } from 'react';
import ProfileSettingModal from '../../components/Modals/ProfileSettingModal/ProfileSettingModal';
import ChangePasswordModal from '../../components/Modals/ChangePasswordModal/ChangePasswordModal';

const ProfileSettingsPage = () => {
  useAuthRedirect();
  const profile = useProfile();
  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);

  if (!profile) {
    return <ProfileLoading />;
  }

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
    <LayoutBase>
      {isOpenEditProfile && (
        <ProfileSettingModal
          onClose={() => setIsOpenEditProfile(false)}
          username={profile.username}
          login={profile.login}
        />
      )}
      {isOpenChangePassword && (
        <ChangePasswordModal onClose={() => setIsOpenChangePassword(false)} />
      )}
      <h2>Настройки профиля</h2>
      <Block className={style.settings}>
        <div className={style.settings__info}>
          <img src={profile.avatar || userIMG} alt="Фото профиля" />
          <div className={style.settings__info__name}>
            <b>{profile.username}</b>
            <p>{profile.login}</p>
            <IconButton icon={<EditSVG size={22} />} onClick={() => setIsOpenEditProfile(true)} />
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
            <TextButton text="Изменить" onClick={() => setIsOpenChangePassword(true)} />
          </div>
        </div>

        <ButtonSecondary>Выйти</ButtonSecondary>
      </Block>
    </LayoutBase>
  );
};

export default ProfileSettingsPage;
