'use client';

import { useQuery } from '@tanstack/react-query';
import { homeQueryKeys } from '@/modules/home/constants/home-query-key.constant';
import { homeService } from '@/modules/home/services/home.service';

export function useHomeSlidesQuery() {
  return useQuery({ queryKey: homeQueryKeys.slides(), queryFn: homeService.getSlides });
}

export function useHomeCategoriesQuery() {
  return useQuery({ queryKey: homeQueryKeys.categories(), queryFn: homeService.getCategories });
}

export function useHomeBrandsQuery() {
  return useQuery({ queryKey: homeQueryKeys.brands(), queryFn: homeService.getBrands });
}

export function useFeaturedProductsQuery() {
  return useQuery({ queryKey: homeQueryKeys.featuredProducts(), queryFn: homeService.getFeaturedProducts });
}
