import { ArticleType } from '../../../types/entities/articleType';
import Article from '../Article/Article';
import style from './ArticleContainer.module.scss';

const ArticleContainer = () => {
  const articles: ArticleType[] = [
    {
      id: 1,
      title: 'Test Article',
      description:
        'Test description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this article',
      banner: null,
      content: [],
      status: 'published',
      createdAt: Date.now(),
      updatedAt: null,
      authorLogin: 'shp0ks',
      authorUsername: 'Shpaks',
      authorAvatar: null,
      reactions: [],
      comments: [],
    },
    {
      id: 2,
      title: 'Test Article',
      description: 'Test description for this article',
      banner: null,
      content: [],
      status: 'published',
      createdAt: Date.now(),
      updatedAt: null,
      authorLogin: 'shp0ks',
      authorUsername: 'Shpaks',
      authorAvatar: null,
      reactions: [],
      comments: [],
    },
  ];

  return (
    <section className={style.articleContainer}>
      {articles.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </section>
  );
};

export default ArticleContainer;
