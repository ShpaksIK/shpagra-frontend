import React from 'react';
import classNames from 'classnames';

import style from './ButtonSecondary.module.scss';

interface ButtonSecondaryProps {
  text: string;
  onClick?: () => void;
  isMaxWidth?: boolean;
  isDanger?: boolean;
}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  text,
  onClick,
  isMaxWidth = false,
  isDanger = false,
}) => {
  return (
    <button
      type="button"
      className={classNames(
        style.buttonSecondary,
        isMaxWidth ? 'max-width' : '',
        isDanger ? style.buttonSecondary_danger : '',
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ButtonSecondary;
