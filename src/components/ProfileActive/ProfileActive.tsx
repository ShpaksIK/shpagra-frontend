import { Link } from 'react-router';
import { MyProfileType } from '../../types/entities/profileType';
import Block from '../../ui/Block/Block';
import ArrowSVG from '../../ui/svg/ArrowSVG';
import style from './ProfileActive.module.scss';
import Avatar from '../../ui/Avatar/Avatar';

interface ProfileActiveProps {
  profile: MyProfileType;
}

const ProfileActive: React.FC<ProfileActiveProps> = ({ profile }) => {
  return (
    <Link to="/profile">
      <Block className={style.profile}>
        <Avatar profileAvatar={profile.avatar} username={profile.login} />
        <ArrowSVG />
      </Block>
    </Link>
  );
};

export default ProfileActive;
