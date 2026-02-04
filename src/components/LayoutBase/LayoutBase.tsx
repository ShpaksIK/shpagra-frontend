import classNames from 'classnames';

import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import style from './LayoutBase.module.scss';

interface LayoutBaseProps {
  children: React.ReactNode;
}

const LayoutBase: React.FC<LayoutBaseProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className={classNames('container', style.content)}>
        <Nav />
        <main className={style.content__inner}>{children}</main>
      </div>
    </>
  );
};

export default LayoutBase;
