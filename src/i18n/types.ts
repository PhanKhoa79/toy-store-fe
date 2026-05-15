export type Locale = 'vi' | 'en';

export type Dictionary = {
  common: {
    appName: string;
    loading: string;
    retry: string;
    errorTitle: string;
    emptyTitle: string;
    language: string;
    vietnamese: string;
    english: string;
  };
  home: {
    eyebrow: string;
    title: string;
    description: string;
    products: string;
    cart: string;
    login: string;
    admin: string;
  };
  products: {
    eyebrow: string;
    title: string;
    loading: string;
    error: string;
    fallbackDescription: string;
    imagePlaceholder: string;
  };
  auth: {
    loginTitle: string;
    registerTitle: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    submitLogin: string;
    submitRegister: string;
    logout: string;
    loginFailed: string;
    registerFailed: string;
    noAccount: string;
    hasAccount: string;
    invalidEmail: string;
    passwordMin: string;
    fullNameRequired: string;
    passwordMismatch: string;
  };
  cart: {
    title: string;
    description: string;
  };
};
