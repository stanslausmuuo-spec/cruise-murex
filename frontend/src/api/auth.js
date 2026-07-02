import { convex } from '../lib/convex';
import { api } from '../../../convex/_generated/api';

export async function loginUser(email, password) {
  return await convex.mutation(api.users.login, { email, password });
}

export async function signupUser(name, email, password) {
  return await convex.mutation(api.users.signup, { name, email, password });
}

export async function getProfile(token) {
  return await convex.query(api.users.getProfile, { token });
}
