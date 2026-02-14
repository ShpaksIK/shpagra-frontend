import { Formik, Form, ErrorMessage, Field, FieldProps } from 'formik';
import * as Yup from 'yup';

import AButtonSecondary from '../../ui/AButtonSecondary/AButtonSecondary';
import Button from '../../ui/Button/Button';
import style from './RegisterPage.module.scss';
import A from '../../ui/A/A';
import { RegisterFormType } from '../../types/formsType';
import Input from '../../ui/Input/Input';
import Block from '../../ui/Block/Block';
import InputPassword from '../../ui/InputPassword/InputPassword';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { register } from '../../redux/slices/authSlice/api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { resetAuthLoading } from '../../redux/slices/authSlice/authSlice';

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const authLoading = useAppSelector((state) => state.auth.loadings.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading.isSuccess) {
      dispatch(resetAuthLoading());
      navigate('/sign-in');
    }
  }, [authLoading.isLoading]);

  const handleSubmit = (values: RegisterFormType) => {
    dispatch(
      register({
        ...values,
      }),
    );
  };

  const inititalValues: RegisterFormType = {
    login: '',
    password: '',
    repeatPassword: '',
    username: '',
  };

  const validationSchema = Yup.object().shape({
    login: Yup.string()
      .required('Логин обязателен')
      .min(3, 'Логин должен содержать не менее 3 символов')
      .max(32, 'Логин должен содержать не более 32 символов'),
    password: Yup.string()
      .min(5, 'Пароль должен содержать не менее 5 символов')
      .max(255, 'Пароль должен содержать не более 255 символов')
      .required('Пароль обязателен'),
    repeatPassword: Yup.string()
      .min(5, 'Пароль должен содержать не менее 5 символов')
      .max(255, 'Пароль должен содержать не более 255 символов')
      .required('Повторите пароль')
      .oneOf([Yup.ref('password')], 'Пароли не совпадают'),
    username: Yup.string()
      .required('Имя пользователя является обязательным')
      .min(3, 'Имя пользователя должно содержать не менее 3 символов')
      .max(32, 'Имя пользователя должно содержать не более 32 символов'),
  });

  return (
    <main className={style.main}>
      <Formik
        initialValues={inititalValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={style.register}>
          <Block className={style.register}>
            <h2>Регистрация</h2>

            <div className={style.register__fields}>
              <div>
                <Field name="login">
                  {({ field }: FieldProps) => <Input {...field} placeholder="Логин" />}
                </Field>
                <ErrorMessage
                  name="login"
                  component="p"
                  className={style.register__fields__error}
                />
              </div>

              <div>
                <Field name="password">
                  {({ field }: FieldProps) => <InputPassword {...field} placeholder="Пароль" />}
                </Field>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={style.register__fields__error}
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
                  className={style.register__fields__error}
                />
              </div>
              <div>
                <Field name="username">
                  {({ field }: FieldProps) => <Input {...field} placeholder="Имя пользователя" />}
                </Field>
                <ErrorMessage
                  name="username"
                  component="p"
                  className={style.register__fields__error}
                />
              </div>
            </div>

            <div className={style.register__controls}>
              <Button type="submit">Зарегистрироваться</Button>
              <AButtonSecondary to="/sign-in">Уже есть профиль</AButtonSecondary>
              <A to="/">На главную</A>
            </div>
          </Block>
        </Form>
      </Formik>
    </main>
  );
};

export default RegisterPage;
