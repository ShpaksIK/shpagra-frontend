import classNames from 'classnames';

import style from './ProfilePage.module.scss';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import { useProfile } from '../../hooks/useProfile';
import userIMG from './../../../public/img/user.png';
import IconLink from '../../ui/IconLink/IconLink';
import SettingsSVG from '../../ui/svg/SettingsSVG';
import IconButton from '../../ui/IconButton/IconButton';
import ShareSVG from '../../ui/svg/ShareSVG';
import { useDefineProfile } from '../../hooks/useDefineProfile';
import TextLink from '../../ui/TextLink/TextLink';
import ArticleContainer from '../../components/ArticleContainer/ArticleContainer';
import CommentContainer from '../../components/CommentContainer/CommentContainer';
import ReactionContainer from '../../components/ReactionContainer/ReactionContainer';

const ProfilePage = () => {
  const profile = useProfile();
  const isMyProfile = useDefineProfile();

  return (
    <>
      <Header />
      <div className={classNames('container', style.content)}>
        <Nav />
        <main className={style.content__inner}>
          <h2 className={style.content__inner__title}>
            {isMyProfile ? 'Мой профиль' : `Профиль ${profile.login}`}
          </h2>
          <div className={style.header}>
            <div className={style.header__avatar}>
              <img src={profile.avatar ? profile.avatar : userIMG} />
              <b>{profile.username}</b>
              <p>{profile.login}</p>
            </div>
            <div className={style.header__controls}>
              <IconButton onClick={() => {}} icon={<ShareSVG />} />
              {isMyProfile && <IconLink to="/settings" icon={<SettingsSVG />} />}
            </div>
          </div>

          <TextLink to="/profile-articles">
            <h2 className={style.content__inner__title}>Статьи</h2>
          </TextLink>

          <ArticleContainer articles={profile.articles} maxArticles={1} />

          <div className={style.blocks}>
            <div className={style.blocks__comments}>
              <TextLink to="/profile-comments">
                <h2 className={style.content__inner__title}>Комментарии</h2>
              </TextLink>

              <CommentContainer comments={profile.comments} maxComments={2} />
            </div>

            <div className={style.blocks__reactions}>
              <TextLink to="/profile-reactions">
                <h2 className={style.content__inner__title}>Реакции</h2>
              </TextLink>

              <ReactionContainer reactions={profile.reactions} maxReactions={2} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfilePage;
