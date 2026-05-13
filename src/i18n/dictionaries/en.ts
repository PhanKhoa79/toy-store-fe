export const en = {
  common: {
    appName: 'Toyshop',
    loading: 'Loading...',
    retry: 'Retry',
    errorTitle: 'Something went wrong',
    emptyTitle: 'No data',
    language: 'Language',
    vietnamese: 'Tiếng Việt',
    english: 'English'
  },
  home: {
    eyebrow: 'Toyshop MVP',
    title: 'Kids toy ecommerce platform',
    description: 'The frontend foundation is ready for API integration, feature implementation, and later Stitch-based redesign.',
    products: 'View products',
    cart: 'Cart',
    login: 'Login',
    admin: 'Admin'
  },
  products: {
    eyebrow: 'Catalog',
    title: 'Products',
    loading: 'Loading products...',
    error: 'Unable to load products.',
    fallbackDescription: 'Safe toys for kids.',
    imagePlaceholder: 'Product image'
  },
  auth: {
    loginTitle: 'Login',
    email: 'Email',
    password: 'Password',
    submitLogin: 'Login',
    invalidEmail: 'Invalid email',
    passwordMin: 'Password must be at least 8 characters'
  },
  cart: {
    title: 'Cart',
    description: 'Guest cart will use Zustand before checkout requires login.'
  }
} as const;
