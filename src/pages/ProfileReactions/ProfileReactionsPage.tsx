import classNames from 'classnames';

import style from './ProfileReactionsPage.module.scss';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import { useProfile } from '../../hooks/useProfile';
import { useDefineMyProfile } from '../../hooks/useDefineMyProfile';
import ReactionContainer from '../../components/ReactionContainer/ReactionContainer';
import ProfileLoading from '../../components/ProfileLoading/ProfileLoading';

const ProfileReactionsPage = () => {
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
            {isMyProfile ? 'Мои реакции' : `Реакции ${profile.login}`}
          </h2>

          <ReactionContainer reactions={profile.reactions} />
        </main>
      </div>
    </>
  );
};

export default ProfileReactionsPage;
