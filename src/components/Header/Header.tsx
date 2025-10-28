import { useMediaQuery } from 'react-responsive';

import HeaderDesktop from '../HeaderDesktop/HeaderDesktop';
import HeaderMobile from '../HeaderMobile/HeaderMobile';

const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: 700 });

  if (isMobile) {
    return <HeaderMobile />;
  }

  return <HeaderDesktop />;
};

export default Header;
