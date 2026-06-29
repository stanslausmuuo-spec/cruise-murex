import { convex } from '../lib/convex';

export async function loginUser(email, password) {
  return await convex.mutation('users:login', { email, password });
}

export async function signupUser(name, email, password) {
  return await convex.mutation('users:signup', { name, email, password });
}

export async function getProfile(token) {
  return await convex.query('users:getProfile', { token });
}
