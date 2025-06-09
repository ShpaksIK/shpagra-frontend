import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import style from './ArticlePreviewContainer.module.scss';
import { AppStateType } from '../../redux';
import { ArticleType } from '../../redux/types/articleType';
import ArticlePreview from '../ArticlePreview/ArticlePreview';
import { getArticles } from '../../redux/reducers/articleReducer';
import { ArticleFilterType } from '../../redux/types/articleFilterType';

interface StateProps {
  articles: ArticleType[];
  login: string;
  articleFilterType: ArticleFilterType;
}

interface DispatchProps {
  getArticles: (articleFilterType: ArticleFilterType) => void;
}

type ArticleFilterProps = StateProps & DispatchProps;

const ArticlePreviewContainer: React.FC<ArticleFilterProps> = ({
  articles,
  login,
  articleFilterType,
  getArticles,
}) => {
  useEffect(() => {
    getArticles(articleFilterType);
  }, []);

  return (
    <div className={style.articlePreviewContainer}>
      {articles.map((article: ArticleType) => (
        <div key={article.id}>
          {article.authorLogin !== login ? (
            <ArticlePreview articleId={article.id} />
          ) : (
            <div>Test Article</div>
          )}
        </div>
      ))}
    </div>
  );
};

const mapState = (state: AppStateType) => {
  return {
    articles: state.article.articles,
    login: state.auth.login,
    articleFilterType: state.article.articleFilterType,
  };
};

export default connect(mapState, { getArticles })(ArticlePreviewContainer);
