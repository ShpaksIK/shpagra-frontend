import React from 'react';

import style from './Close.module.scss';
import CloseSVG from './CloseSVG';

interface CloseProps {
  onClick?: () => void;
}

const Close: React.FC<CloseProps> = ({ onClick }) => {
  return (
    <button className={style.close} type="button" onClick={onClick} title="Закрыть">
      <CloseSVG className={style.close__svg} />
    </button>
  );
};

export default Close;
