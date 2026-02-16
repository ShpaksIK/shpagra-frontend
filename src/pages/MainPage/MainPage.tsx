import ArticleFilter from '../../components/ArticleFilter/ArticleFilter';
import ArticleContainer from '../../components/ArticleContainer/ArticleContainer';
import LayoutBase from '../../components/Layouts/LayoutBase/LayoutBase';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { useEffect } from 'react';
import { getArticles } from '../../redux/slices/articleSlice/api';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector((state) => state.article.articles);
  const filter = useAppSelector((state) => state.article.filter);

  useEffect(() => {
    dispatch(getArticles(filter));
  }, [filter]);

  return (
    <LayoutBase>
      <ArticleFilter />
      <ArticleContainer articles={articles} />
    </LayoutBase>
  );
};

export default MainPage;
