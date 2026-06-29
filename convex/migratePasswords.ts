import { mutation } from './_generated/server';
import { hashPassword } from './lib/password';

export const migratePasswords = mutation({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query('users').collect();
    let migrated = 0;
    for (const user of users) {
      // Hashed passwords are stored as "salt:hash" (contains ':')
      // Plaintext passwords have no ':'
      if (!user.password.includes(':')) {
        const hashed = await hashPassword(user.password);
        await ctx.db.patch(user._id, { password: hashed });
        migrated++;
      }
    }
    return { migrated, total: users.length };
  },
});
