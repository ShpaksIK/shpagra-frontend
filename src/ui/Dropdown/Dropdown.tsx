import React, { useEffect, useRef } from 'react';

import style from './Dropdown.module.scss';
import Close from '../Close/Close';

interface DropdownProps {
  isShowCloseImg?: boolean;
  dropdownClose?: () => void;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ isShowCloseImg = false, dropdownClose, children }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        dropdownClose?.();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownClose]);

  return (
    <div ref={dropdownRef} className={style.dropdown}>
      {isShowCloseImg && <Close />}
      {children}
    </div>
  );
};

export default Dropdown;
