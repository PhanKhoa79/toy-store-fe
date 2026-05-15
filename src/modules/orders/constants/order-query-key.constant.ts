export const orderQueryKeys = {
  all: ['orders'] as const,
  lists: () => [...orderQueryKeys.all, 'list'] as const,
  detail: (orderCode: string) => [...orderQueryKeys.all, 'detail', orderCode] as const
};
