import React from 'react';
import classNames from 'classnames';

import style from './Input.module.scss';

interface InputProps {
  type?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  isMaxWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  onFocus,
  onBlur,
  placeholder = '',
  isMaxWidth = false,
}) => {
  return (
    <input
      type={type}
      className={classNames(style.input, isMaxWidth ? 'max-width' : '')}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
    />
  );
};

export default Input;
