import { useLocation, useNavigate } from 'react-router';
import { useAppSelector } from './useStore';
import { useEffect } from 'react';

export const useNavigateMyProfile = () => {
  const profile = useAppSelector((state) => state.auth.profile);
  const location = useLocation();
  const navigate = useNavigate();

  const currentLogin = location.pathname.split('/')[2];

  useEffect(() => {
    if (profile && profile.login === currentLogin) {
      navigate('/profile');
    }
  }, [profile]);
};
