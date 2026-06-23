import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('bookings').order('desc').collect();
  },
});

export const getByUser = query({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    return await ctx.db.query('bookings')
      .withIndex('by_userId', q => q.eq('userId', args.userId))
      .order('desc')
      .collect();
  },
});

export const create = mutation({
  args: {
    userId: v.id('users'),
    userName: v.string(),
    userEmail: v.string(),
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
    const id = await ctx.db.insert('bookings', {
      ...args,
      status: 'confirmed',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
    });
    return await ctx.db.get(id);
  },
});

export const processPayment = mutation({
  args: { bookingId: v.id('bookings') },
  handler: async (ctx, args) => {
    const booking = await ctx.db.get(args.bookingId);
    if (!booking) return false;
    await ctx.db.patch(args.bookingId, {
      paymentStatus: 'paid',
      paidAt: new Date().toISOString(),
    });
    return true;
  },
});
