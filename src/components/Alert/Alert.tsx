import style from './Alert.module.scss';
import { AlertType } from './../../types/alertType';
import classNames from 'classnames';
import ErrorSVG from '../../ui/svg/ErrorSVG';
import InformationSVG from '../../ui/svg/InformationSVG';
import WarningSVG from '../../ui/svg/WarningSVG';
import SuccessSVG from '../../ui/svg/SuccessSVG';

interface AlertProps {
  alert: AlertType | null;
}

const Alert: React.FC<AlertProps> = ({ alert }) => {
  console.log(alert)
  return (
    <div className={style.alert_block}>
      {alert && (
        <div
          className={classNames(style.alert, {
            [style.alert__info]: alert.type === 'info',
            [style.alert__error]: alert.type === 'error',
            [style.alert__warning]: alert.type === 'warning',
            [style.alert__success]: alert.type === 'success',
          })}
        >
          {alert.type === 'error' && <ErrorSVG />}
          {alert.type === 'info' && <InformationSVG />}
          {alert.type === 'success' && <SuccessSVG />}
          {alert.type === 'warning' && <WarningSVG />}
          <p>{alert.content}</p>
        </div>
      )}
    </div>
  );
};

export default Alert;
