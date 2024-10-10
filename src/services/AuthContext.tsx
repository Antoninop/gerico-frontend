import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  user: { id: number; email?: string } | null;
  login: (userData: { id: number; email: string }, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: number; email?: string } | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId'); //TODO: change to userId to real userId 
    if (token && userId) {
      setUser({ id: Number(userId) });
    }
  }, []);

  const login = (userData: { id: number; email: string }, token: string) => {
    setUser(userData);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userId', String(userData.id));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth error');
  }
  return context;
};
