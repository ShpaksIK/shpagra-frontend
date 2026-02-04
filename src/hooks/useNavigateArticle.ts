import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';

export const useNavigateArticle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentArticle = location.pathname.split('/')[2];

  useEffect(() => {
    if (!currentArticle) {
      navigate('/');
    }
  }, []);
};
