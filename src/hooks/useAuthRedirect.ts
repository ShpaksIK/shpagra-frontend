import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useAppSelector } from './useStore';

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const profile = useAppSelector((state) => state.auth.profile);

  useEffect(() => {
    if (!profile) {
      navigate('/sign-in');
    }
  }, []);
};
