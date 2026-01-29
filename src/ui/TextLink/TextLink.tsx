import React from 'react';

import style from './TextLink.module.scss';
import { Link } from 'react-router';
import ShareSVG from '../svg/ShareSVG';

interface TextLinkProps {
  to: string;
  children: React.ReactNode;
}

const TextLink: React.FC<TextLinkProps> = ({ to, children }) => {
  return (
    <Link to={to} className={style.textLink}>
      {children}
      <ShareSVG />
    </Link>
  );
};

export default TextLink;
