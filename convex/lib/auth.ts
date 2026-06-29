export async function getUserFromToken(ctx: any, token: string) {
  if (!token) return null;
  return await ctx.db
    .query('users')
    .withIndex('by_token', (q: any) => q.eq('token', token))
    .first();
}

export async function requireAuth(ctx: any, token: string) {
  const user = await getUserFromToken(ctx, token);
  if (!user) throw new Error('Authentication required');
  return user;
}

export async function requireAdmin(ctx: any, token: string) {
  const user = await requireAuth(ctx, token);
  if (user.role !== 'admin') throw new Error('Admin access required');
  return user;
}
