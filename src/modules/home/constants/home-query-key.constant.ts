export const homeQueryKeys = {
  all: ['home'] as const,
  slides: () => [...homeQueryKeys.all, 'slides'] as const,
  categories: () => [...homeQueryKeys.all, 'categories'] as const,
  brands: () => [...homeQueryKeys.all, 'brands'] as const,
  featuredProducts: () => [...homeQueryKeys.all, 'featured-products'] as const
};
