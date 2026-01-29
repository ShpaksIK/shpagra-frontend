import { useLocation } from 'react-router';

export const useProfile = () => {
  const location = useLocation();

  const splitPathname = location.pathname.split('/');

  if (!splitPathname[2]) {
    return {
      login: 'shp0ks',
      username: 'Shpaks',
      created_at: '10-10-10',
      avatar: null,
    };
  }

  // проверяем, есть ли в store уже загруженный профиль
  // И совпадает ли URL открытого профиля с хранимым.

  const profile = {
    login: 'Ifnuh666',
    username: 'Максим',
    created_at: '10-10-10',
    avatar: null,
  };

  return profile;
};
