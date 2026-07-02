import { useQuery } from 'convex/react';
import { anyApi as api } from 'convex/server';

export function useCars() {
  return useQuery(api.cars.list) ?? [];
}

export function useCar(id) {
  return useQuery(api.cars.getById, { id });
}

export function useFeaturedCars() {
  const result = useQuery(api.cars.getFeatured);
  return result ?? [];
}

export function useCategories() {
  const result = useQuery(api.cars.getCategories);
  return result ?? [];
}
