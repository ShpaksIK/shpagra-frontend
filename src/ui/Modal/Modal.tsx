import Background from '../Background/Background';
import style from './Modal.module.scss';
import Close from '../Close/Close';
import Block from '../Block/Block';

interface ModalProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClick, children }) => {
  return (
    <Background onClick={onClick}>
      <Block className={style.modal} onClick={(e) => e.stopPropagation()}>
        <div className={style.modal__close}>
          <Close onClick={onClick} />
        </div>
        {children}
      </Block>
    </Background>
  );
};

export default Modal;
