import { useLocation } from 'react-router';

export const useDefineProfile = (): boolean => {
  const location = useLocation();

  if (location.pathname === '/profile') {
    return true;
  }

  return false;
};
