import { useParams } from 'react-router';

export const useDefineMyProfile = (): boolean => {
  const params = useParams();
  const profileLogin = params.profileLogin;

  if (!profileLogin) {
    return true;
  }

  return false;
};
