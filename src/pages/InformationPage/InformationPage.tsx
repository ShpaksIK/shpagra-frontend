import classNames from 'classnames';

import style from './InformationPage.module.scss';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import A from '../../ui/A/A';

const InformationPage = () => {
  return (
    <>
      <Header />
      <div className={classNames('container', style.content)}>
        <Nav />
        <div className={style.content__inner}>
          <h2 className={style.content__inner__title}>Информация</h2>
          <main className={style.main}>
            <A to="/info/privacy">Политика конфиденциальности</A>
            <A to="/info/terms">Условия использования</A>
            <A to="/info/site">Информация о сайте</A>
          </main>
        </div>
      </div>
    </>
  );
};

export default InformationPage;
