import { useQuery, useMutation } from 'convex/react';

const BOOKINGS_KEY = 'cruise-bookings';

function getLocal() {
  try {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
  } catch {
    return [];
  }
}

function createLocal(payload) {
  const bookings = getLocal();
  const booking = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    ...payload,
    status: 'confirmed',
    paymentStatus: 'pending',
    createdAt: new Date().toISOString(),
  };
  bookings.push(booking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  return booking;
}

function processPaymentLocal(bookingId) {
  const bookings = getLocal();
  const idx = bookings.findIndex(b => b.id === bookingId);
  if (idx === -1) return false;
  bookings[idx].paymentStatus = 'paid';
  bookings[idx].paidAt = new Date().toISOString();
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  return true;
}

function getByUserLocal(userId) {
  return getLocal()
    .filter(b => b.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function listLocal() {
  return getLocal()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function useUserBookings(userId) {
  const result = useQuery('bookings:getByUser', userId ? { userId } : 'skip');
  return result ?? (userId ? getByUserLocal(userId) : []);
}

export function useAllBookings() {
  const result = useQuery('bookings:list');
  return result ?? listLocal();
}

export function useCreateBooking() {
  const createConvex = useMutation('bookings:create');
  return async (payload) => {
    try {
      return await createConvex(payload);
    } catch {
      return createLocal(payload);
    }
  };
}

export function useProcessPayment() {
  const processConvex = useMutation('bookings:processPayment');
  return async (bookingId) => {
    try {
      await processConvex({ bookingId });
    } catch {
      processPaymentLocal(bookingId);
    }
  };
}
