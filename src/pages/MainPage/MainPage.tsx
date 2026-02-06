import ArticleFilter from '../../components/ArticleFilter/ArticleFilter';
import ArticleContainer from '../../components/ArticleContainer/ArticleContainer';
import LayoutBase from '../../components/Layouts/LayoutBase/LayoutBase';
import { useAppSelector } from '../../hooks/useStore';

const MainPage = () => {
  const articles = useAppSelector((state) => state.article.articles);

  return (
    <LayoutBase>
      <ArticleFilter />
      <ArticleContainer articles={articles} />
    </LayoutBase>
  );
};

export default MainPage;
