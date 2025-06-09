import React from 'react';

import Background from '../Background/Background';

import style from './Modal.module.scss';
import closeSVG from './../../../public/svg/close.svg';

interface ModalProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClick, children }) => {
  return (
    <>
      <Background onClick={onClick} />
      <div className={style.modal}>
        <div className={style.modal__inner}>
          <div className={style.modal__close}>
            <img src={closeSVG} alt="Закрыть" onClick={onClick} />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
