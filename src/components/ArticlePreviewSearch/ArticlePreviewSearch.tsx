import React from 'react';
import { Link } from 'react-router';

import style from './ArticlePreviewSearch.module.scss';

interface ArticlePreviewSearchProps {
  articleTitle: string;
  articleDescription: string;
  articleId: number;
  articleCreatedAt: string;
}

const ArticlePreviewSearch: React.FC<ArticlePreviewSearchProps> = ({
  articleTitle,
  articleDescription,
  articleId,
  articleCreatedAt,
}) => {
  return (
    <div className={style.articlePreview}>
      <div className={style.articlePreview__text}>
        <Link to={`/article/${articleId}`}>
          <b>{articleTitle}</b>
        </Link>
        <Link to={`/article/${articleId}`}>
          <p className={style.articlePreview__textDescription}>{articleDescription}</p>
        </Link>
      </div>
      <div className={style.articlePreview__info}>
        <p className={style.articlePreview__infoText}>{articleCreatedAt}</p>
      </div>
    </div>
  );
};

export default ArticlePreviewSearch;
