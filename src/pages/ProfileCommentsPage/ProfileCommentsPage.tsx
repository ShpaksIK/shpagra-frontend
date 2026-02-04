import { useProfile } from '../../hooks/useProfile';
import { useDefineMyProfile } from '../../hooks/useDefineMyProfile';
import CommentContainer from '../../components/CommentContainer/CommentContainer';
import ProfileLoading from '../../components/ProfileLoading/ProfileLoading';
import LayoutBase from '../../components/LayoutBase/LayoutBase';

const ProfileCommentsPage = () => {
  const profile = useProfile();
  const isMyProfile = useDefineMyProfile();

  if (!profile) {
    return <ProfileLoading />;
  }

  return (
    <LayoutBase>
      <h2>{isMyProfile ? 'Мои комментарии' : `Комментарии ${profile.login}`}</h2>

      <CommentContainer comments={profile.comments} />
    </LayoutBase>
  );
};

export default ProfileCommentsPage;
