import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import { hashPassword, verifyPassword, generateToken } from './lib/password';
import { getUserFromToken } from './lib/auth';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const login = mutation({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email.toLowerCase().trim()))
      .first();
    if (!user) return null;
    const valid = await verifyPassword(args.password, user.password);
    if (!valid) return null;
    const token = generateToken();
    await ctx.db.patch(user._id, { token });
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role ?? 'user',
      token,
    };
  },
});

export const signup = mutation({
  args: { name: v.string(), email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const email = args.email.toLowerCase().trim();
    if (!EMAIL_REGEX.test(email)) throw new Error('Invalid email format');
    if (args.password.length < 8) throw new Error('Password must be at least 8 characters');
    if (args.name.trim().length < 2) throw new Error('Name must be at least 2 characters');
    const existing = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', email))
      .first();
    if (existing) return null;
    const hashed = await hashPassword(args.password);
    const token = generateToken();
    const id = await ctx.db.insert('users', {
      name: args.name.trim(),
      email,
      password: hashed,
      role: 'user',
      token,
    });
    return {
      id,
      name: args.name.trim(),
      email,
      role: 'user',
      token,
    };
  },
});

export const getProfile = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const user = await getUserFromToken(ctx, args.token);
    if (!user) return null;
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role ?? 'user',
    };
  },
});

export const seed = mutation({
  args: {
    users: v.array(
      v.object({
        name: v.string(),
        email: v.string(),
        password: v.string(),
        role: v.optional(v.string()),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query('users').collect();
    if (existing.length > 0) return { seeded: false, count: existing.length };
    for (const user of args.users) {
      const hashed = await hashPassword(user.password);
      await ctx.db.insert('users', {
        name: user.name,
        email: user.email.toLowerCase().trim(),
        password: hashed,
        role: user.role ?? 'user',
        token: generateToken(),
      });
    }
    return { seeded: true, count: args.users.length };
  },
});
