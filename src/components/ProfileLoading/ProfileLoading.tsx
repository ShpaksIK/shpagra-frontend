import classNames from 'classnames';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import style from './ProfileLoading.module.scss';

const ProfileLoading = () => {
  return (
    <>
      <Header />
      <div className={classNames('container', style.content)}>
        <Nav />
        <main className={style.content__inner}>
          <h2>Загрузка...</h2>
        </main>
      </div>
    </>
  );
};

export default ProfileLoading;
