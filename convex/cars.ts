import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('cars').collect();
  },
});

export const getById = query({
  args: { id: v.id('cars') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('cars').filter(q => q.eq(q.field('featured'), true)).collect();
  },
});

export const getCategories = query({
  args: {},
  handler: async (ctx) => {
    const cars = await ctx.db.query('cars').collect();
    return [...new Set(cars.map(c => c.category))];
  },
});

export const seed = mutation({
  args: {
    cars: v.array(v.object({
      make: v.string(),
      model: v.string(),
      year: v.number(),
      category: v.string(),
      dailyRate: v.number(),
      seats: v.number(),
      fuelType: v.string(),
      speed: v.string(),
      description: v.string(),
      image: v.string(),
      available: v.boolean(),
      featured: v.boolean(),
    })),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query('cars').collect();
    if (existing.length > 0) return { seeded: false, count: existing.length };
    for (const car of args.cars) {
      await ctx.db.insert('cars', car);
    }
    return { seeded: true, count: args.cars.length };
  },
});
