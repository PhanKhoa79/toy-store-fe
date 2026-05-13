export const vi = {
  common: {
    appName: 'Toyshop',
    loading: 'Đang tải...',
    retry: 'Thử lại',
    errorTitle: 'Đã có lỗi xảy ra',
    emptyTitle: 'Không có dữ liệu',
    language: 'Ngôn ngữ',
    vietnamese: 'Tiếng Việt',
    english: 'English'
  },
  home: {
    eyebrow: 'Toyshop MVP',
    title: 'Nền tảng ecommerce đồ chơi trẻ em',
    description: 'Base frontend đã sẵn sàng để kết nối API, implement feature theo docs, và redesign UI bằng Stitch ở giai đoạn sau.',
    products: 'Xem sản phẩm',
    cart: 'Giỏ hàng',
    login: 'Đăng nhập',
    admin: 'Admin'
  },
  products: {
    eyebrow: 'Catalog',
    title: 'Sản phẩm',
    loading: 'Đang tải sản phẩm...',
    error: 'Không tải được danh sách sản phẩm.',
    fallbackDescription: 'Đồ chơi an toàn cho bé.',
    imagePlaceholder: 'Ảnh sản phẩm'
  },
  auth: {
    loginTitle: 'Đăng nhập',
    email: 'Email',
    password: 'Mật khẩu',
    submitLogin: 'Đăng nhập',
    invalidEmail: 'Email không hợp lệ',
    passwordMin: 'Mật khẩu tối thiểu 8 ký tự'
  },
  cart: {
    title: 'Giỏ hàng',
    description: 'Guest cart sẽ được implement bằng Zustand trước khi checkout yêu cầu đăng nhập.'
  }
} as const;
