import { useProfile } from '../../hooks/useProfile';
import { useDefineMyProfile } from '../../hooks/useDefineMyProfile';
import ReactionContainer from '../../components/ReactionContainer/ReactionContainer';
import ProfileLoading from '../../components/ProfileLoading/ProfileLoading';
import LayoutBase from '../../components/Layouts/LayoutBase/LayoutBase';
import { useAppSelector } from '../../hooks/useStore';

const ProfileReactionsPage = () => {
  const profile = useProfile();
  const reactions = useAppSelector((state) => state.profile.profileReactions);
  const isMyProfile = useDefineMyProfile();

  if (!profile) {
    return <ProfileLoading />;
  }

  return (
    <LayoutBase>
      <h2>{isMyProfile ? 'Мои реакции' : `Реакции ${profile.login}`}</h2>

      <ReactionContainer reactions={reactions} />
    </LayoutBase>
  );
};

export default ProfileReactionsPage;
