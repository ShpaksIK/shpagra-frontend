import { useEffect } from 'react';

import style from './ProfilePage.module.scss';
import userIMG from './../../../public/img/user.png';
import IconLink from '../../ui/IconLink/IconLink';
import SettingsSVG from '../../ui/svg/SettingsSVG';
import IconButton from '../../ui/IconButton/IconButton';
import ShareSVG from '../../ui/svg/ShareSVG';
import TextLink from '../../ui/TextLink/TextLink';
import ArticleContainer from '../../components/ArticleContainer/ArticleContainer';
import CommentContainer from '../../components/CommentContainer/CommentContainer';
import ReactionContainer from '../../components/ReactionContainer/ReactionContainer';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { getMyProfile } from '../../redux/slices/authSlice/api';
import { useNavigate } from 'react-router';
import ProfileLoading from '../../components/ProfileLoading/ProfileLoading';
import LayoutBase from '../../components/Layouts/LayoutBase/LayoutBase';
import Block from '../../ui/Block/Block';
import { resetAuthLoading } from '../../redux/slices/authSlice/authSlice';

const MyProfilePage = () => {
  const profile = useAppSelector((state) => state.auth.profile);
  const authLoading = useAppSelector((state) => state.auth.loadings.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!profile && authLoading.isDone) {
      resetAuthLoading();
      navigate('/sign-in');
    } else {
      dispatch(getMyProfile());
    }
  }, [authLoading.isDone, profile?.login]);

  if (!profile) {
    return <ProfileLoading />;
  }

  return (
    <LayoutBase>
      <h2>Мой профиль</h2>
      <Block className={style.header}>
        <div className={style.header__avatar}>
          <img src={profile.avatar ? profile.avatar : userIMG} />
          <div>
            <b>{profile.username}</b>
            <p>{profile.login}</p>
          </div>
        </div>
        <div className={style.header__controls}>
          <IconButton onClick={() => {}} icon={<ShareSVG />} />
          <IconLink to="/settings" icon={<SettingsSVG />} />
        </div>
      </Block>

      {profile.articles.length > 0 && (
        <>
          <TextLink to={`/profile/${profile.login}/articles`}>
            <h2>Мои статьи</h2>
          </TextLink>
          <ArticleContainer articles={profile.articles} maxArticles={1} />
        </>
      )}

      <div className={style.blocks}>
        {profile.comments.length > 0 && (
          <Block className={style.blocks__comments}>
            <TextLink to={`/profile/${profile.login}/comments`}>
              <h2>Мои комментарии</h2>
            </TextLink>

            <CommentContainer comments={profile.comments} maxComments={2} />
          </Block>
        )}

        {profile.reactions.length > 0 && (
          <Block className={style.blocks__reactions}>
            <TextLink to={`/profile/${profile.login}/reactions`}>
              <h2>Мои реакции</h2>
            </TextLink>

            <ReactionContainer reactions={profile.reactions} maxReactions={2} />
          </Block>
        )}
      </div>
    </LayoutBase>
  );
};

export default MyProfilePage;
