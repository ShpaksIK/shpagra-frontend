import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Button from '@mui/material/Button';
import Like from '../../ui/Like/Like';

import style from './ArticlePreview.module.scss';
import articlePreviewIMG from './../../../public/images/logo-big.png';
import { ArticleType } from '../../redux/types/articleType';
import { setLike } from '../../redux/reducers/articleReducer';
import { AppStateType } from '../../redux';

interface StateProps {
  article: ArticleType;
}

interface DispatchProps {
  setLike: (articleId: number) => void;
}

interface OwnProps {
  articleId: number;
}

type ArticleFilterProps = StateProps & DispatchProps & OwnProps;

const ArticlePreview: React.FC<ArticleFilterProps> = ({ setLike, article }) => {
  return (
    <article className={style.articlePreview}>
      <Link to={`/article/${article.id}`}>
        <img
          className={style.articlePreview__banner}
          src={article.banner ? article.banner : articlePreviewIMG}
        />
      </Link>
      <div className={style.articlePreview__content}>
        <h2>{article.title}</h2>
        <p>{article.description}</p>
        <div className={style.articlePreview__footer}>
          <Button href={`/article/${article.id}`}>Читать</Button>
          <Like isLike={article.isLike} onClick={() => setLike(article.id)} />
        </div>
      </div>
    </article>
  );
};

const mapState = (state: AppStateType, ownProps: OwnProps) => {
  const article = state.article.articles.find((a) => a.id === ownProps.articleId);
  return {
    article: article as ArticleType,
    articles: state.article.articles,
  };
};

export default connect(mapState, { setLike })(ArticlePreview);
