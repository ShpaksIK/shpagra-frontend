import { useEffect } from 'react';
import classNames from 'classnames';

import style from './ProfilePage.module.scss';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import userIMG from './../../../public/img/user.png';
import IconLink from '../../ui/IconLink/IconLink';
import SettingsSVG from '../../ui/svg/SettingsSVG';
import IconButton from '../../ui/IconButton/IconButton';
import ShareSVG from '../../ui/svg/ShareSVG';
import TextLink from '../../ui/TextLink/TextLink';
import ArticleContainer from '../../components/ArticleContainer/ArticleContainer';
import CommentContainer from '../../components/CommentContainer/CommentContainer';
import ReactionContainer from '../../components/ReactionContainer/ReactionContainer';
import { useAppSelector } from '../../hooks/useStore';
import { getMyProfile } from '../../redux/slices/authSlice/api';
import { useNavigate } from 'react-router';
import ProfileLoading from '../../components/ProfileLoading/ProfileLoading';

const MyProfilePage = () => {
  const profile = useAppSelector((state) => state.auth.profile);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/sign-in');
    } else {
      getMyProfile();
    }
  }, [isAuth, navigate]);

  if (!profile) {
    return <ProfileLoading />;
  }

  return (
    <>
      <Header />
      <div className={classNames('container', style.content)}>
        <Nav />
        <main className={style.content__inner}>
          <h2 className={style.content__inner__title}>Мой профиль</h2>
          <div className={style.header}>
            <div className={style.header__avatar}>
              <img src={profile.avatar ? profile.avatar : userIMG} />
              <b>{profile.username}</b>
              <p>{profile.login}</p>
            </div>
            <div className={style.header__controls}>
              <IconButton onClick={() => {}} icon={<ShareSVG />} />
              <IconLink to="/settings" icon={<SettingsSVG />} />
            </div>
          </div>

          <TextLink to={`/profile/${profile.login}/articles`}>
            <h2 className={style.content__inner__title}>Мои статьи</h2>
          </TextLink>

          <ArticleContainer articles={profile.articles} maxArticles={1} />

          <div className={style.blocks}>
            <div className={style.blocks__comments}>
              <TextLink to={`/profile/${profile.login}/comments`}>
                <h2 className={style.content__inner__title}>Мои комментарии</h2>
              </TextLink>

              <CommentContainer comments={profile.comments} maxComments={2} />
            </div>

            <div className={style.blocks__reactions}>
              <TextLink to={`/profile/${profile.login}/reactions`}>
                <h2 className={style.content__inner__title}>Мои реакции</h2>
              </TextLink>

              <ReactionContainer reactions={profile.reactions} maxReactions={2} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default MyProfilePage;
