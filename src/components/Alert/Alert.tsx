import style from './Alert.module.scss';
import errorSVG from './../../assets/svg/error.svg';
import { AlertType } from './../../types/alertType';
import classNames from 'classnames';

interface AlertProps {
  alert: AlertType | null;
}

const Alert: React.FC<AlertProps> = ({ alert }) => {
  return (
    <div className={style.alert_block}>
      {alert && (
        <div className={classNames(
          style.alert,
          {
            [style.alert__info]: alert.type === 'info',
            [style.alert__error]: alert.type === 'error',
            [style.alert__warning]: alert.type === 'warning',
            [style.alert__success]: alert.type === 'success',
          },
        )}>
          {alert.type === 'error' && <img src={errorSVG} alt="Ошибка" />}
          {alert.type === 'info' && <img src={errorSVG} alt="Информация" />}
          {alert.type === 'success' && <img src={errorSVG} alt="Успешно" />}
          {alert.type === 'warning' && <img src={errorSVG} alt="Предупреждение" />}
          <p>{alert.content}</p>
        </div>
      )}
    </div>
  );
};

export default Alert;
