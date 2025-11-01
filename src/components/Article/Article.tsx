import { useState } from 'react';
import { Link } from 'react-router';

import { ArticleType } from '../../../types/entities/articleType';
import style from './Article.module.scss';
import bannerIMG from './../../../public/img/test.png';
import Avatar from '../../ui/Avatar/Avatar';
import { formatTimestamp } from './../../../utils/dateFormatter';
import IconButton from '../../ui/IconButton/IconButton';
import { copyToClipboard } from './../../../utils/copyToClipboard';
import ShareSVG from '../../ui/svg/ShareSVG';
import HeartSVG from '../../ui/svg/HeartSVG';
import CommentSVG from '../../ui/svg/CommentSVG';

interface ArticleProps {
  article: ArticleType;
}

const Article: React.FC<ArticleProps> = ({ article }) => {
  const createdAt = formatTimestamp(article.createdAt);

  const [isOpenComments, setOpenComments] = useState<boolean>(false);
  const toggleOpenComments = () => {
    setOpenComments((prev) => !prev);
  };

  const [isSentReaction, setReaction] = useState<boolean>(false);
  const toggleReaction = () => {
    setReaction((prev) => !prev);
  };

  const copyArticleLink = () => {
    copyToClipboard(`http://localhost:5173/article/${article.id}`);
  };

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
        <p className={style.article__content__description}>{article.description}</p>
        <div className={style.article__footer}>
          <div className={style.article__footer__author}>
            <Avatar
              profileAvatar={article.authorAvatar}
              profileId={article.authorLogin}
              username={article.authorUsername}
            />
            <p className={style.article__footer__created}>| {createdAt}</p>
          </div>

          <div className={style.article__footer__controls}>
            <IconButton
              onClick={toggleReaction}
              icon={isSentReaction ? <HeartSVG color="#ff0000" filled={true} /> : <HeartSVG />}
              text="1488"
            />
            <IconButton
              onClick={toggleOpenComments}
              icon={isOpenComments ? <CommentSVG color="#000000" /> : <CommentSVG />}
              text="12"
            />
            <IconButton onClick={copyArticleLink} icon={<ShareSVG />} />
          </div>
        </div>
      </div>
      {isOpenComments && <div className={style.article__comments}></div>}
    </article>
  );
};

export default Article;
