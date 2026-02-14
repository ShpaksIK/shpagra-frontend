import { Formik, Form, ErrorMessage, Field, FieldProps } from 'formik';
import * as Yup from 'yup';

import Modal from '../../../ui/Modal/Modal';
import style from './ChangePasswordModal.module.scss';
import { ChangePasswordFormType } from '../../../types/formsType';
import Button from '../../../ui/Button/Button';
import ButtonSecondary from '../../../ui/ButtonSecondary/ButtonSecondary';
import InputPassword from '../../../ui/InputPassword/InputPassword';
import { useAppDispatch } from '../../../hooks/useStore';
import { changePassword } from '../../../redux/slices/authSlice/api';

interface ProfileSettingModalProps {
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ProfileSettingModalProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();

  const handleSubmit = (values: ChangePasswordFormType) => {
    dispatch(
      changePassword({
        currentPassword: values.currentPassword,
        password: values.password,
      }),
    );
    onClose();
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .min(5, 'Пароль должен содержать не менее 5 символов')
      .required('Введите текущий пароль'),
    password: Yup.string()
      .min(5, 'Пароль должен содержать не менее 5 символов')
      .required('Новый пароль обязателен'),
    repeatPassword: Yup.string()
      .min(5, 'Пароль должен содержать не менее 5 символов')
      .required('Повторите пароль')
      .oneOf([Yup.ref('password')], 'Пароли не совпадают'),
  });

  const inititalValues: ChangePasswordFormType = {
    currentPassword: '',
    password: '',
    repeatPassword: '',
  };

  return (
    <Modal onClick={onClose}>
      <Formik
        initialValues={inititalValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={style.modal}>
          <h2>Изменение пароля</h2>

          <div className={style.modal__fields__inner}>
            <div className={style.modal__fields}>
              <div>
                <Field name="currentPassword">
                  {({ field }: FieldProps) => (
                    <InputPassword {...field} placeholder="Текущий пароль" />
                  )}
                </Field>
                <ErrorMessage
                  name="currentPassword"
                  component="div"
                  className={style.modal__fields__error}
                />
              </div>

              <div>
                <Field name="password">
                  {({ field }: FieldProps) => (
                    <InputPassword {...field} placeholder="Новый пароль" />
                  )}
                </Field>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={style.modal__fields__error}
                />
              </div>

              <div>
                <Field name="repeatPassword">
                  {({ field }: FieldProps) => (
                    <InputPassword {...field} placeholder="Повтор пароля" />
                  )}
                </Field>
                <ErrorMessage
                  name="repeatPassword"
                  component="div"
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

export default ChangePasswordModal;
