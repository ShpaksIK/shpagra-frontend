import { ArticleType } from '../../types/entities/articleType';
import Article from '../Article/Article';
import style from './ArticleContainer.module.scss';

interface ArticleContainerProps {
  maxVisible?: number;
  maxArticles?: number;
}

const ArticleContainer: React.FC<ArticleContainerProps> = ({ maxVisible, maxArticles }) => {
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
      comments: [
        {
          id: 1,
          content: 'Test comment',
          createdAt: Date.now(),
          updatedAt: null,
          authorLogin: 'skebob',
          authorUsername: 'Матвей',
          authorAvatar: null,
          parent: null,
          relatedId: 1,
          relatedType: 'article',
          reactions: [],
        },
        {
          id: 2,
          content: 'Test comment 2',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          authorLogin: 'skebob2',
          authorUsername: 'Матвей 2',
          authorAvatar: null,
          parent: {
            id: 1,
            authorUsername: 'Матвей',
            relatedType: 'article',
            text: 'Test comment',
          },
          relatedId: 1,
          relatedType: 'article',
          reactions: [],
        },
      ],
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
