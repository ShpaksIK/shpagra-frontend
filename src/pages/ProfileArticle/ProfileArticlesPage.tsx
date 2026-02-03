import classNames from 'classnames';

import style from './ProfileArticlesPage.module.scss';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import { useProfile } from '../../hooks/useProfile';
import { useDefineMyProfile } from '../../hooks/useDefineMyProfile';
import ArticleContainer from '../../components/ArticleContainer/ArticleContainer';
import ProfileLoading from '../../components/ProfileLoading/ProfileLoading';

const ProfileArticlesPage = () => {
  const profile = useProfile();
  const isMyProfile = useDefineMyProfile();

  if (!profile) {
    return <ProfileLoading />;
  }

  return (
    <>
      <Header />
      <div className={classNames('container', style.content)}>
        <Nav />
        <main className={style.content__inner}>
          <h2 className={style.content__inner__title}>
            {isMyProfile ? 'Мои статьи' : `Статьи ${profile.login}`}
          </h2>

          <ArticleContainer articles={profile.articles} />
        </main>
      </div>
    </>
  );
};

export default ProfileArticlesPage;
