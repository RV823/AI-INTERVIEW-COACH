import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 'demo_user_123',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    target_role: 'Software Engineer',
    xp: 450,
    level: 3,
    streak: 5,
    badges: ['First Step', 'Resume Master', 'Code Ninja', 'Streak Master']
  });

  const [token, setToken] = useState(localStorage.getItem('token') || 'demo_token');

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('token', userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
