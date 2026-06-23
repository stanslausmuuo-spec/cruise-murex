import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const login = query({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db.query('users')
      .withIndex('by_email', q => q.eq('email', args.email))
      .first();
    if (!user || user.password !== args.password) return null;
    return { id: user._id, name: user.name, email: user.email, role: user.role ?? 'user' };
  },
});

export const signup = mutation({
  args: { name: v.string(), email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query('users')
      .withIndex('by_email', q => q.eq('email', args.email))
      .first();
    if (existing) return null;
    const id = await ctx.db.insert('users', {
      name: args.name,
      email: args.email,
      password: args.password,
      role: 'user',
    });
    return { id, name: args.name, email: args.email, role: 'user' };
  },
});

export const seed = mutation({
  args: {
    users: v.array(v.object({
      name: v.string(),
      email: v.string(),
      password: v.string(),
      role: v.optional(v.string()),
    })),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query('users').collect();
    if (existing.length > 0) return { seeded: false, count: existing.length };
    for (const user of args.users) {
      await ctx.db.insert('users', user);
    }
    return { seeded: true, count: args.users.length };
  },
});
