import { useEffect } from 'react';
import { Formik, Form, ErrorMessage, Field, FieldProps } from 'formik';
import * as Yup from 'yup';

import AButtonSecondary from '../../ui/AButtonSecondary/AButtonSecondary';
import Button from '../../ui/Button/Button';
import style from './LoginPage.module.scss';
import A from '../../ui/A/A';
import { LoginFormType } from '../../types/formsType';
import Input from '../../ui/Input/Input';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { login } from '../../redux/slices/authSlice/api';
import { useNavigate } from 'react-router';
import Block from '../../ui/Block/Block';
import InputPassword from '../../ui/InputPassword/InputPassword';
import { resetAuthLoading } from '../../redux/slices/authSlice/authSlice';
import ProfileActive from '../../components/ProfileActive/ProfileActive';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authLoading = useAppSelector((state) => state.auth.loadings.auth);
  const profile = useAppSelector((state) => state.auth.profile);

  const handleSubmit = (values: LoginFormType) => {
    dispatch(
      login({
        login: values.login,
        password: values.password,
      }),
    );
  };

  useEffect(() => {
    if (authLoading.isSuccess) {
      dispatch(resetAuthLoading());
      navigate('/profile');
    }
  }, [authLoading.isLoading]);

  const inititalValues: LoginFormType = {
    login: '',
    password: '',
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
  });

  return (
    <main className={style.main}>
      <Formik
        initialValues={inititalValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Block className={style.login}>
            <h2>Вход в аккаунт</h2>

            {profile && (
              <div className={style.login__active}>
                <p>Активная сессия</p>
                <ProfileActive profile={profile} />
              </div>
            )}

            <div className={style.login__fields}>
              <div>
                <Field name="login">
                  {({ field }: FieldProps) => <Input {...field} placeholder="Логин" />}
                </Field>
                <ErrorMessage name="login" component="p" className={style.login__fields__error} />
              </div>

              <div>
                <Field name="password">
                  {({ field }: FieldProps) => <InputPassword {...field} placeholder="Пароль" />}
                </Field>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={style.login__fields__error}
                />
              </div>
            </div>

            <div className={style.login__controls}>
              <Button type="submit">Войти</Button>
              <AButtonSecondary to="/sign-up">Создать аккаунт</AButtonSecondary>
              <A to="/">На главную</A>
            </div>
          </Block>
        </Form>
      </Formik>
    </main>
  );
};

export default LoginPage;
