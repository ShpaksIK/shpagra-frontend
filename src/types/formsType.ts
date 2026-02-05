export interface LoginFormType {
  login: string;
  password: string;
}

export interface RegisterFormType {
  login: string;
  password: string;
  repeatPassword: string;
  username: string;
}

export interface ProfileSettingFormType {
  login: string;
  username: string;
}

export interface ChangePasswordFormType {
  currentPassword: string;
  password: string;
  repeatPassword: string;
}
