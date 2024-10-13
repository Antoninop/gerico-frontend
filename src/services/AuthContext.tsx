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
    const userId = sessionStorage.getItem('userId');
    const email = sessionStorage.getItem('email'); 

    if (token && userId && email) {
      setUser({ id: Number(userId), email }); 
    }
  }, []);

  const login = (userData: { id: number; email: string }, token: string) => {
    setUser(userData);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userId', String(userData.id));
    sessionStorage.setItem('email', userData.email); 
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('email');
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
    throw new Error();
  }
  return context;
};
