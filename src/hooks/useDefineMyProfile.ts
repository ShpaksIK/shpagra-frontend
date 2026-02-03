import { useLocation } from 'react-router';

export const useDefineMyProfile = (): boolean => {
  const location = useLocation();

  const splitLocation = location.pathname.split('/');

  if (location.pathname === '/profile' || !splitLocation[1]) {
    return true;
  }

  return false;
};
