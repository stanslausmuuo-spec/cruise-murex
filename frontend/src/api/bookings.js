import { useQuery, useMutation } from 'convex/react';
import { anyApi as api } from 'convex/server';
import useAuth from '../hooks/useAuth';

export function useUserBookings() {
  const { token } = useAuth();
  const result = useQuery(api.bookings.getByUser, token ? { token } : 'skip');
  return result ?? [];
}

export function useAllBookings() {
  const { token } = useAuth();
  const result = useQuery(api.bookings.list, token ? { token } : 'skip');
  return result ?? [];
}

export function useCreateBooking() {
  const { token } = useAuth();
  const createBooking = useMutation(api.bookings.create);
  return async (payload) => {
    return await createBooking({ ...payload, token });
  };
}

export function useProcessPayment() {
  const { token } = useAuth();
  const processPayment = useMutation(api.bookings.processPayment);
  return async (bookingId) => {
    await processPayment({ bookingId, token });
  };
}
