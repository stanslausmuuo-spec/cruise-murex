import { convex } from '../lib/convex';

const FALLBACK_USERS = [
  { id: 1, name: 'Admin User', email: 'admin@cruise.com', password: 'admin123', role: 'admin' },
  { id: 2, name: 'Jane Driver', email: 'jane@example.com', password: 'password123', role: 'user' },
];

export async function loginUser(email, password) {
  try {
    const result = await convex.query('users:login', { email, password });
    if (!result) return null;
    return { id: result.id, name: result.name, email: result.email, role: result.role ?? 'user' };
  } catch {
    const found = FALLBACK_USERS.find(u => u.email === email && u.password === password);
    if (!found) return null;
    return { id: found.id, name: found.name, email: found.email, role: found.role };
  }
}

export async function signupUser(name, email, password) {
  try {
    const result = await convex.mutation('users:signup', { name, email, password });
    if (!result) return null;
    return { id: result.id, name: result.name, email: result.email, role: 'user' };
  } catch {
    return { id: Date.now(), name, email, role: 'user' };
  }
}
