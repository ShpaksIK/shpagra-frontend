import { ArticleType } from '../../types/entities/articleType';
import Article from '../Article/Article';
import style from './ArticleContainer.module.scss';

interface ArticleContainerProps {
  maxVisible?: number;
  maxArticles?: number;
  articles: ArticleType[];
}

const ArticleContainer: React.FC<ArticleContainerProps> = ({
  maxVisible,
  maxArticles,
  articles,
}) => {
  const sliced = articles.slice(0, maxArticles);

  return (
    <section className={style.articleContainer}>
      {sliced.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </section>
  );
};

export default ArticleContainer;
