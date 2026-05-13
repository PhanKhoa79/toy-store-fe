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
    email: string;
    password: string;
    submitLogin: string;
    invalidEmail: string;
    passwordMin: string;
  };
  cart: {
    title: string;
    description: string;
  };
};
