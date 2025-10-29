import { Link } from 'react-router';

import { ArticleType } from '../../../types/entities/articleType';
import style from './Article.module.scss';
import bannerIMG from './../../../public/img/test.png';
import Avatar from '../../ui/Avatar/Avatar';
import { formatTimestamp } from './../../../utils/dateFormatter'

interface ArticleProps {
  article: ArticleType;
}

const Article: React.FC<ArticleProps> = ({ article }) => {
  const createdAt = formatTimestamp(article.createdAt);

  return (
    <article className={style.article}>
      <Link to={`/article/${article.id}`}>
        <div className={style.article__banner}>
            <img className={style.article__image} src={bannerIMG} alt={article.title} />
            <div className={style.article__image__background}></div>
            <p className={style.article__title}>{article.title}</p>
        </div>
      </Link>
      <div className={style.article__content}>
        <p className={style.article__description}>{article.description}</p>
        <div className={style.article__footer}>
          <div className={style.article__footer__author}>
            <Link to={`/profile/${article.authorLogin}`}>
              <Avatar profileAvatar={article.authorAvatar} profileId={article.authorLogin} username={article.authorUsername} />
            </Link>
            <p className={style.article__footer__created}>| {createdAt}</p>
          </div>

          <div className={style.footer__controls}>
            
          </div>
        </div>
      </div>
    </article>
  );
};

export default Article;
