import React from 'react';
import classNames from 'classnames';

import HeaderContainer from '../../components/HeaderContainer/HeaderContainer';
import Nav from '../../components/Nav/Nav';
import style from './MainPage.module.scss';
import ArticleFilter from '../../components/ArticleFilter/ArticleFilter';
import ArticlePreviewContainer from '../../components/ArticlePreviewContainer/ArticlePreviewContainer';

const MainPage: React.FC = () => {
  return (
    <>
      <HeaderContainer />
      <div className={classNames(style.content, 'container')}>
        <div>
          <Nav />
        </div>
        <main className={style.main}>
          <ArticleFilter />
          <ArticlePreviewContainer />
        </main>
      </div>
    </>
  );
};

export default MainPage;
