import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import { getUserFromToken, requireAuth, requireAdmin } from './lib/auth';

export const list = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    return await ctx.db.query('bookings').order('desc').collect();
  },
});

export const getByUser = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const user = await requireAuth(ctx, args.token);
    return await ctx.db
      .query('bookings')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .order('desc')
      .collect();
  },
});

export const create = mutation({
  args: {
    token: v.string(),
    carId: v.id('cars'),
    carMake: v.string(),
    carModel: v.string(),
    carImage: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    days: v.number(),
    total: v.number(),
    dailyRate: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await requireAuth(ctx, args.token);
    const id = await ctx.db.insert('bookings', {
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      carId: args.carId,
      carMake: args.carMake,
      carModel: args.carModel,
      carImage: args.carImage,
      startDate: args.startDate,
      endDate: args.endDate,
      days: args.days,
      total: args.total,
      dailyRate: args.dailyRate,
      status: 'confirmed',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
    });
    return await ctx.db.get(id);
  },
});

export const processPayment = mutation({
  args: { bookingId: v.id('bookings'), token: v.string() },
  handler: async (ctx, args) => {
    const user = await requireAuth(ctx, args.token);
    const booking = await ctx.db.get(args.bookingId);
    if (!booking) throw new Error('Booking not found');
    if (booking.userId !== user._id && user.role !== 'admin') {
      throw new Error('Not authorized to process this payment');
    }
    await ctx.db.patch(args.bookingId, {
      paymentStatus: 'paid',
      paidAt: new Date().toISOString(),
    });
    return true;
  },
});
