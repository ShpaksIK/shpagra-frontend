import { useDefineMyProfile } from '../../hooks/useDefineMyProfile';
import OtherProfilePage from './OtherProfilePage';
import MyProfilePage from './MyProfilePage';

const ProfilePage = () => {
  const isMyProfile = useDefineMyProfile();

  if (isMyProfile) {
    return <MyProfilePage />;
  }

  return <OtherProfilePage />;
};

export default ProfilePage;
