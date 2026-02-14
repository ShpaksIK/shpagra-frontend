import { useEffect } from 'react';

import style from './ProfilePage.module.scss';
import userIMG from './../../../public/img/user.png';
import IconButton from '../../ui/IconButton/IconButton';
import ShareSVG from '../../ui/svg/ShareSVG';
import TextLink from '../../ui/TextLink/TextLink';
import ArticleContainer from '../../components/ArticleContainer/ArticleContainer';
import CommentContainer from '../../components/CommentContainer/CommentContainer';
import ReactionContainer from '../../components/ReactionContainer/ReactionContainer';
import { getProfile } from '../../redux/slices/profileSlice/api';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import ProfileLoading from '../../components/ProfileLoading/ProfileLoading';
import { useNavigateMyProfile } from '../../hooks/useNavigateMyProfile';
import LayoutBase from '../../components/Layouts/LayoutBase/LayoutBase';
import Block from '../../ui/Block/Block';
import { useParams } from 'react-router';

const OtherProfilePage = () => {
  const profile = useAppSelector((state) => state.profile.profile);
  const params = useParams();
  const dispatch = useAppDispatch();
  const profileLogin = params.profileLogin as string;
  useNavigateMyProfile();

  useEffect(() => {
    dispatch(getProfile(profileLogin));
  }, []);

  if (!profile) {
    return <ProfileLoading />;
  }

  return (
    <LayoutBase>
      <h2>Профиль {profile.login}</h2>
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
        </div>
      </Block>

      <TextLink to={`/profile/${profile.login}/articles`}>
        <h2>Статьи</h2>
      </TextLink>

      <ArticleContainer articles={profile.articles} maxArticles={1} />

      <div className={style.blocks}>
        <Block className={style.blocks__comments}>
          <TextLink to={`/profile/${profile.login}/comments`}>
            <h2>Комментарии</h2>
          </TextLink>

          <CommentContainer comments={profile.comments} maxComments={2} />
        </Block>

        <Block className={style.blocks__reactions}>
          <TextLink to={`/profile/${profile.login}/reactions`}>
            <h2>Реакции</h2>
          </TextLink>

          <ReactionContainer reactions={profile.reactions} maxReactions={2} />
        </Block>
      </div>
    </LayoutBase>
  );
};

export default OtherProfilePage;
