import style from './Alert.module.scss';
import errorSVG from './../../assets/svg/error.svg';
import { AlertType } from './../../types/alertType';

interface AlertProps {
  alert: AlertType;
}

const Alert: React.FC<AlertProps> = ({ alert }) => {
  return (
    <div className={style.alert_block}>
      {alert.isExists && (
        <div className={style.alert}>
          {alert.type === 'error' && <img src={errorSVG} alt="Ошибка" />}
          {alert.type === 'info' && <img src={errorSVG} alt="Информация" />}
          {alert.type === 'success' && <img src={errorSVG} alt="Успешно" />}
          {alert.type === 'warning' && <img src={errorSVG} alt="Предупреждение" />}
          <p>{alert.content || ''}</p>
        </div>
      )}
    </div>
  );
};

export default Alert;
