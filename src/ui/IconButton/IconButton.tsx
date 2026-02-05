import classNames from 'classnames';

import style from './IconButton.module.scss';

interface IconButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  text?: string;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, icon, text, className }) => {
  return (
    <button
      className={classNames(style.iconButton, className ? className : '')}
      onClick={onClick}
      type="button"
    >
      {icon}
      <div className={style.iconButton__text}>
        <p>{text}</p>
      </div>
    </button>
  );
};

export default IconButton;
