import classNames from 'classnames';

import style from './ProfileReactionsPage.module.scss';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import { useProfile } from '../../hooks/useProfile';
import { useDefineProfile } from '../../hooks/useDefineProfile';
import ReactionContainer from '../../components/ReactionContainer/ReactionContainer';

const ProfileReactionsPage = () => {
  const profile = useProfile();
  const isMyProfile = useDefineProfile();

  return (
    <>
      <Header />
      <div className={classNames('container', style.content)}>
        <Nav />
        <main className={style.content__inner}>
          <h2 className={style.content__inner__title}>
            {isMyProfile ? 'Мои статьи' : `Статьи ${profile.login}`}
          </h2>

          <ReactionContainer reactions={profile.reactions} />
        </main>
      </div>
    </>
  );
};

export default ProfileReactionsPage;
