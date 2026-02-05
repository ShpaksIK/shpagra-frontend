import classNames from 'classnames';

import Header from '../../Header/Header';
import Nav from '../../Nav/Nav';
import style from './LayoutArticle.module.scss';
import Block from '../../../ui/Block/Block';
import { ArticleContentType } from '../../../types/entities/articleType';
import Line from '../../../ui/Line/Line';

interface LayoutArticleProps {
  articleTitles: ArticleContentType[];
  children: React.ReactNode;
}

const LayoutArticle: React.FC<LayoutArticleProps> = ({ articleTitles, children }) => {
  return (
    <>
      <Header />
      <div className={classNames('container', style.content)}>
        <aside className={style.content__aside}>
          <Nav />
          <Block className={style.content__aside__info}>
            <h2>Содержание статьи</h2>
            <div className={style.content__aside__info__line}>
              <Line />
            </div>
            <ul>
              {articleTitles.map((e, i) => (
                <li key={`${i}-${e}`}>
                  <a href={`#title-${i + 1}`}>{e.text}</a>
                </li>
              ))}
            </ul>
          </Block>
        </aside>
        <main className={style.content__inner}>{children}</main>
      </div>
    </>
  );
};

export default LayoutArticle;
