import { Formik, Form, ErrorMessage, Field, FieldProps } from 'formik';
import * as Yup from 'yup';

import Modal from '../../../ui/Modal/Modal';
import style from './ProfileSettingModal.module.scss';
import { ProfileSettingFormType } from '../../../types/formsType';
import Button from '../../../ui/Button/Button';
import ButtonSecondary from '../../../ui/ButtonSecondary/ButtonSecondary';
import Input from '../../../ui/Input/Input';

interface ProfileSettingModalProps extends ProfileSettingFormType {
  onClose: () => void;
}

const ProfileSettingModal: React.FC<ProfileSettingModalProps> = ({ onClose, login, username }) => {
  const handleSubmit = (values: ProfileSettingFormType) => {
    console.log(values);
    onClose();
  };

  const validationSchema = Yup.object().shape({
    login: Yup.string()
      .required('Логин обязателен')
      .min(3, 'Логин должен содержать не менее 3 символов')
      .max(32, 'Логин должен содержать не более 32 символов'),
    username: Yup.string()
      .required('Имя пользователя является обязательным')
      .min(3, 'Имя пользователя должно содержать не менее 3 символов')
      .max(32, 'Имя пользователя должно содержать не более 32 символов'),
  });

  const inititalValues: ProfileSettingFormType = {
    login,
    username,
  };

  return (
    <Modal onClick={onClose}>
      <Formik
        initialValues={inititalValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={style.modal}>
          <h2>Изменение профиля</h2>

          <div className={style.modal__fields__inner}>
            <div className={style.modal__fields}>
              <div>
                <Field name="login">
                  {({ field }: FieldProps) => <Input {...field} placeholder="Логин" />}
                </Field>
                <ErrorMessage name="login" component="p" className={style.modal__fields__error} />
              </div>

              <div>
                <Field name="username">
                  {({ field }: FieldProps) => <Input {...field} placeholder="Имя пользователя" />}
                </Field>
                <ErrorMessage
                  name="username"
                  component="p"
                  className={style.modal__fields__error}
                />
              </div>
            </div>

            <div className={style.modal__controls}>
              <Button isMaxWidth type="submit">
                Сохранить
              </Button>
              <ButtonSecondary isMaxWidth onClick={onClose}>
                Отмена
              </ButtonSecondary>
            </div>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};

export default ProfileSettingModal;
