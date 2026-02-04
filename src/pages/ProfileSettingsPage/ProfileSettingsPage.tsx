import style from './ProfileSettingsPage.module.scss';
import { useProfile } from '../../hooks/useProfile';
import userIMG from './../../../public/img/user.png';
import IconButton from '../../ui/IconButton/IconButton';
import Switch from '../../ui/Switch/Switch';
import { SettingsType } from '../../types/settingsType';
import TextButton from '../../ui/TextButton/TextButton';
import ButtonSecondary from '../../ui/ButtonSecondary/ButtonSecondary';
import ProfileLoading from '../../components/ProfileLoading/ProfileLoading';
import LayoutBase from '../../components/LayoutBase/LayoutBase';
import Block from '../../ui/Block/Block';
import EditSVG from '../../ui/svg/EditSVG';

const ProfileSettingsPage = () => {
  const profile = useProfile();

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
      <h2>Настройки профиля</h2>
      <Block className={style.settings}>
        <div className={style.settings__info}>
          <img src={profile.avatar || userIMG} alt="Фото профиля" />
          <div className={style.settings__info__name}>
            <b>{profile.username}</b>
            <p>{profile.login}</p>
            <IconButton icon={<EditSVG />} onClick={() => {}} />
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
      </Block>
    </LayoutBase>
  );
};

export default ProfileSettingsPage;
