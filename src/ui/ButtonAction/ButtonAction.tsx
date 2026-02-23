import classNames from 'classnames';
import style from './ButtonAction.module.scss';

interface ButtonActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  isMaxWidth?: boolean;
  isDanger?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const ButtonAction: React.FC<ButtonActionProps> = ({
  onClick,
  isMaxWidth = false,
  isDanger = false,
  disabled = false,
  icon,
  children,
  ...rest
}) => {
  const handleClick = () => {
    if (!disabled) {
      onClick?.();
    }
  };

  return (
    <button
      type="button"
      className={classNames(
        style.buttonAction,
        isMaxWidth && 'max-width',
        isDanger && style.buttonAction_danger,
        disabled && style.buttonAction_disabled,
      )}
      onClick={handleClick}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
};

export default ButtonAction;
