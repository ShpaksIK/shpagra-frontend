import { useAppSelector } from './useStore';

export const useAuth = () => {
  const profile = useAppSelector((state) => state.auth.profile);
  return profile;
};
