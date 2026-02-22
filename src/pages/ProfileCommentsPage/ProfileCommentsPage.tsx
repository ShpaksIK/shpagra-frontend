import { useProfile } from '../../hooks/useProfile';
import { useDefineMyProfile } from '../../hooks/useDefineMyProfile';
import CommentContainer from '../../components/CommentContainer/CommentContainer';
import ProfileLoading from '../../components/ProfileLoading/ProfileLoading';
import LayoutBase from '../../components/Layouts/LayoutBase/LayoutBase';
import { useAppSelector } from '../../hooks/useStore';

const ProfileCommentsPage = () => {
  const profile = useProfile();
  const comments = useAppSelector((state) => state.profile.profileComments);
  const isMyProfile = useDefineMyProfile();

  if (!profile) {
    return <ProfileLoading />;
  }

  return (
    <LayoutBase>
      <h2>{isMyProfile ? 'Мои комментарии' : `Комментарии ${profile.login}`}</h2>

      <CommentContainer comments={comments} />
    </LayoutBase>
  );
};

export default ProfileCommentsPage;
