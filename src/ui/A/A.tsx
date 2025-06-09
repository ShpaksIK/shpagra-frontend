import React from 'react';
import { Link } from 'react-router';

import style from './A.module.scss';

interface AProps {
  to: string;
  text: string;
}

const A: React.FC<AProps> = ({ to, text }) => {
  return (
    <Link className={style.a} to={to}>
      {text}
    </Link>
  );
};

export default A;
