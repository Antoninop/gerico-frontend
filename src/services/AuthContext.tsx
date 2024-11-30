import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  firstName?: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isTokenExpired: () => boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp;
    return Math.floor(Date.now() / 1000) >= expiry;
  } catch (error) {
    return true; 
  }
};

const getUserFromToken = (token: string): User | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.sub,
      firstName: payload.firstname,
      isAdmin: payload.admin === 1,
    };
  } catch (error) {
    return null; 
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      if (isTokenExpired(token)) {
        logout();
      } else {
        const userData = getUserFromToken(token);
        if (userData) {
          setUser(userData);
        } else {
          logout();
        }
      }
    }
    setLoading(false);
  }, []);

  const login = (token: string) => {
    const userData = getUserFromToken(token);
    if (userData) {
      setUser(userData);
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('firstname', userData.firstName || '');
    } else {
      console.error('Invalid token');
      logout(); 
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('firstname');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isTokenExpired: () => isTokenExpired(sessionStorage.getItem('token') || ''),
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
