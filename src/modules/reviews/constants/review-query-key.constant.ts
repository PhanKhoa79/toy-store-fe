export const reviewQueryKeys = {
  all: ['reviews'] as const,
  product: (productId: string) => [...reviewQueryKeys.all, 'product', productId] as const
};
