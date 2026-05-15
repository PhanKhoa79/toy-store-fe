export const blogQueryKeys = {
  all: ['blogs'] as const,
  lists: () => [...blogQueryKeys.all, 'list'] as const,
  detail: (slug: string) => [...blogQueryKeys.all, 'detail', slug] as const
};
