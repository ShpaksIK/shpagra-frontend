import Background from '../Background/Background';
import style from './Modal.module.scss';
import Close from '../Close/Close';

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
            <Close />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
