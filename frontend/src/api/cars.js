import { useQuery } from 'convex/react';

export function useCars() {
  return useQuery('cars:list') ?? [];
}

export function useCar(id) {
  return useQuery('cars:getById', { id });
}

export function useFeaturedCars() {
  const result = useQuery('cars:getFeatured');
  return result ?? [];
}

export function useCategories() {
  const result = useQuery('cars:getCategories');
  return result ?? [];
}
