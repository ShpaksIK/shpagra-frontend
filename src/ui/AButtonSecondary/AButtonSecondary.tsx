import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

import style from './AButtonSecondary.module.scss';

interface AButtonSecondaryProps {
  to: string;
  text: string;
  isMaxWidth?: boolean;
  isDanger?: boolean;
}

const AButtonSecondary: React.FC<AButtonSecondaryProps> = ({
  to,
  text,
  isMaxWidth = false,
  isDanger = false,
}) => {
  return (
    <Link
      className={classNames(
        style.aButtonSecondary,
        isMaxWidth ? 'max-width' : '',
        isDanger ? style.aButtonSecondary_danger : '',
      )}
      to={to}
    >
      {text}
    </Link>
  );
};

export default AButtonSecondary;
