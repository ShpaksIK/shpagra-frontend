import { useLocation } from 'react-router';
import { useAppSelector } from './useStore';
import { MyProfileType, ProfileType } from '../types/entities/profileType';

export const useProfile = (): ProfileType | MyProfileType | null => {
  const location = useLocation();
  const profile = useAppSelector((state) => state.profile.profile);
  const myProfile = useAppSelector((state) => state.auth.profile);

  const splitPathname = location.pathname.split('/');
  const login = splitPathname[2];

  if (myProfile && myProfile.login === login) {
    return myProfile;
  }

  return profile;
};
