import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useStore';
import { getMyProfile } from '../redux/slices/authSlice/api';

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.auth.profile);

  useEffect(() => {
    if (!profile) {
      dispatch(getMyProfile());
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!profile) {
        navigate('/sign-in');
      }
    }, 3000);
  }, [profile?.login]);
};
