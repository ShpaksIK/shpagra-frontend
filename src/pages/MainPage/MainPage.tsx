import classNames from 'classnames';

import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import style from './MainPage.module.scss';
import ArticleFilter from '../../components/ArticleFilter/ArticleFilter';
import ArticleContainer from '../../components/ArticleContainer/ArticleContainer';

const MainPage = () => {
  return (
    <>
      <Header />
      <div className={classNames('container', style.content)}>
        <Nav />
        <div className={style.main}>
          <ArticleFilter />
          <main>
            <ArticleContainer />
          </main>
        </div>
      </div>
    </>
  );
};

export default MainPage;
