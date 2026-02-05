import ArticleFilter from '../../components/ArticleFilter/ArticleFilter';
import ArticleContainer from '../../components/ArticleContainer/ArticleContainer';
import { articles } from '../../api/testData';
import LayoutBase from '../../components/Layouts/LayoutBase/LayoutBase';

const MainPage = () => {
  return (
    <LayoutBase>
      <ArticleFilter />
      <ArticleContainer articles={articles} />
    </LayoutBase>
  );
};

export default MainPage;
