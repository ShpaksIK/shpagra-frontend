import classNames from 'classnames';

import style from './ProfileCommentsPage.module.scss';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import { useProfile } from '../../hooks/useProfile';
import { useDefineMyProfile } from '../../hooks/useDefineMyProfile';
import CommentContainer from '../../components/CommentContainer/CommentContainer';
import ProfileLoading from '../../components/ProfileLoading/ProfileLoading';

const ProfileCommentsPage = () => {
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
            {isMyProfile ? 'Мои комментарии' : `Комментарии ${profile.login}`}
          </h2>

          <CommentContainer comments={profile.comments} />
        </main>
      </div>
    </>
  );
};

export default ProfileCommentsPage;
