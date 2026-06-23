/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useCallback, useMemo } from 'react';
import { loginUser, signupUser } from '../api/auth';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('cruise-user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      localStorage.removeItem('cruise-user');
      return null;
    }
  });
  const loading = false;

  const login = useCallback(async (email, password) => {
    const userData = await loginUser(email, password);
    if (!userData) return false;
    setUser(userData);
    localStorage.setItem('cruise-user', JSON.stringify(userData));
    return true;
  }, []);

  const signup = useCallback(async (name, email, password) => {
    const userData = await signupUser(name, email, password);
    if (!userData) return false;
    setUser(userData);
    localStorage.setItem('cruise-user', JSON.stringify(userData));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('cruise-user');
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    login,
    signup,
    logout,
    isAdmin: user?.role === 'admin',
  }), [user, loading, login, signup, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
