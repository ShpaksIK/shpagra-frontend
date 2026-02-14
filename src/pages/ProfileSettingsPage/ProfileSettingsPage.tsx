import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import style from './ProfileSettingsPage.module.scss';
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
import ProfileSettingModal from '../../components/Modals/ProfileSettingModal/ProfileSettingModal';
import ChangePasswordModal from '../../components/Modals/ChangePasswordModal/ChangePasswordModal';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { getMyProfile, logout, updateMyProfile } from '../../redux/slices/authSlice/api';

const ProfileSettingsPage = () => {
  const profile = useAppSelector((state) => state.auth.profile);
  const isInitialized = useAppSelector((state) => state.auth.initialized);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);

  useEffect(() => {
    if (!profile && isInitialized) {
      navigate('/sign-in');
    } else {
      dispatch(getMyProfile());
    }
  }, [isInitialized]);

  if (!profile) {
    return <ProfileLoading />;
  }

  const switchSetting = (checked: boolean, type: SettingsType) => {
    switch (type) {
      case 'visible-articles':
        dispatch(
          updateMyProfile({
            settings: {
              is_visible_articles: checked,
            },
          }),
        );
        break;
      case 'visible-comments':
        dispatch(
          updateMyProfile({
            settings: {
              is_visible_comments: checked,
            },
          }),
        );
        break;
      case 'visible-reactions':
        dispatch(
          updateMyProfile({
            settings: {
              is_visible_reactions: checked,
            },
          }),
        );
        break;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
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
          <img src={profile?.avatar || userIMG} alt="Фото профиля" />
          <div className={style.settings__info__name}>
            <b>{profile.username}</b>
            <p>{profile.login}</p>
            <IconButton icon={<EditSVG size={22} />} onClick={() => setIsOpenEditProfile(true)} />
          </div>
        </div>

        <div className={style.settings__controls}>
          <div className={style.settings__controls__control}>
            <p>Отображать мои статьи</p>
            <Switch
              checked={profile.is_visible_articles}
              type="visible-articles"
              onChange={switchSetting}
            />
          </div>
          <div className={style.settings__controls__control}>
            <p>Отображать мои комментарии</p>
            <Switch
              checked={profile.is_visible_comments}
              type="visible-comments"
              onChange={switchSetting}
            />
          </div>
          <div className={style.settings__controls__control}>
            <p>Отображать мои реакции</p>
            <Switch
              checked={profile.is_visible_reactions}
              type="visible-reactions"
              onChange={switchSetting}
            />
          </div>
          <div className={style.settings__controls__control}>
            <p>Текущий пароль</p>
            <TextButton text="Изменить" onClick={() => setIsOpenChangePassword(true)} />
          </div>
        </div>

        <ButtonSecondary onClick={handleLogout}>Выйти</ButtonSecondary>
      </Block>
    </LayoutBase>
  );
};

export default ProfileSettingsPage;
