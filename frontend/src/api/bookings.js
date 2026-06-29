import { useQuery, useMutation } from 'convex/react';
import useAuth from '../hooks/useAuth';

export function useUserBookings() {
  const { token } = useAuth();
  const result = useQuery('bookings:getByUser', token ? { token } : 'skip');
  return result ?? [];
}

export function useAllBookings() {
  const { token } = useAuth();
  const result = useQuery('bookings:list', token ? { token } : 'skip');
  return result ?? [];
}

export function useCreateBooking() {
  const { token } = useAuth();
  const createConvex = useMutation('bookings:create');
  return async (payload) => {
    return await createConvex({ ...payload, token });
  };
}

export function useProcessPayment() {
  const { token } = useAuth();
  const processConvex = useMutation('bookings:processPayment');
  return async (bookingId) => {
    await processConvex({ bookingId, token });
  };
}
