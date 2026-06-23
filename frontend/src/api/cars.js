import { useQuery } from 'convex/react';
import cars from '../data/cars';

export function useCars() {
  const result = useQuery('cars:list');
  return result ?? cars;
}

export function useCar(id) {
  const result = useQuery('cars:getById', { id });
  return result ?? cars.find(c => String(c.id) === id) ?? null;
}

export function useFeaturedCars() {
  const result = useQuery('cars:getFeatured');
  return result ?? cars.filter(c => c.featured).slice(0, 3);
}

export function useCategories() {
  const result = useQuery('cars:getCategories');
  return result ?? [...new Set(cars.map(c => c.category))];
}
