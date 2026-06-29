import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { loginUser, signupUser, getProfile } from '../api/auth';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('cruise-token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() => !!localStorage.getItem('cruise-token'));

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    getProfile(token)
      .then((profile) => {
        if (cancelled) return;
        if (profile) {
          setUser(profile);
        } else {
          localStorage.removeItem('cruise-token');
          setToken(null);
        }
      })
      .catch(() => {
        if (cancelled) return;
        localStorage.removeItem('cruise-token');
        setToken(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  const login = useCallback(async (email, password) => {
    const data = await loginUser(email, password);
    if (!data) return false;
    localStorage.setItem('cruise-token', data.token);
    setToken(data.token);
    setUser({ id: data.id, name: data.name, email: data.email, role: data.role });
    return true;
  }, []);

  const signup = useCallback(async (name, email, password) => {
    const data = await signupUser(name, email, password);
    if (!data) return false;
    localStorage.setItem('cruise-token', data.token);
    setToken(data.token);
    setUser({ id: data.id, name: data.name, email: data.email, role: data.role });
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('cruise-token');
    setToken(null);
    setUser(null);
    setLoading(false);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      signup,
      logout,
      isAdmin: user?.role === 'admin',
    }),
    [user, token, loading, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
