import { useProfile } from '../../hooks/useProfile';
import { useDefineMyProfile } from '../../hooks/useDefineMyProfile';
import ArticleContainer from '../../components/ArticleContainer/ArticleContainer';
import ProfileLoading from '../../components/ProfileLoading/ProfileLoading';
import LayoutBase from '../../components/Layouts/LayoutBase/LayoutBase';

const ProfileArticlesPage = () => {
  const profile = useProfile();
  const isMyProfile = useDefineMyProfile();

  if (!profile) {
    return <ProfileLoading />;
  }

  return (
    <LayoutBase>
      <h2>{isMyProfile ? 'Мои статьи' : `Статьи ${profile.login}`}</h2>

      <ArticleContainer articles={profile.articles} />
    </LayoutBase>
  );
};

export default ProfileArticlesPage;
