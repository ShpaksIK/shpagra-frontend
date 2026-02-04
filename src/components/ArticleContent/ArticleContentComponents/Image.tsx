import { useState } from 'react';
import style from './Components.module.scss';
import ModalImage from '../../../ui/ModalImage/ModalImage';

interface ImageProps {
  src?: string;
  text?: string;
}

const Image: React.FC<ImageProps> = ({ src, text }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={style.image}>
      {isOpen && (
        <ModalImage onClick={() => setIsOpen(false)}>
          <img src={src} alt={text} />
        </ModalImage>
      )}
      <img src={src} alt={text} onClick={() => setIsOpen(true)} />
      <p>{text}</p>
    </div>
  );
};

export default Image;
