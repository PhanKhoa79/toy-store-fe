export const customerAccountQueryKeys = {
  all: ['customer-account'] as const,
  profile: () => [...customerAccountQueryKeys.all, 'profile'] as const,
  addresses: () => [...customerAccountQueryKeys.all, 'addresses'] as const,
  wishlist: () => [...customerAccountQueryKeys.all, 'wishlist'] as const
};
