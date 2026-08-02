import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS } from '../mockData/initialData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('ic_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('ic_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    localStorage.setItem('ic_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ic_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ic_current_user');
    }
  }, [currentUser]);

  const login = (email, password) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      return { success: true, user };
    }
    return { success: false, message: 'Invalid credentials. Try using demo login!' };
  };

  const signup = (userData) => {
    const id = (userData.role === 'business' ? 'b' : 'i') + Date.now();
    const newUser = {
      id,
      rating: 5.0,
      reviewsCount: 0,
      completionScore: 85,
      isVerified: false,
      ...userData,
    };
    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    return newUser;
  };

  const switchDemoUser = (userId) => {
    const found = users.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
    }
  };

  const updateUserProfile = (updatedData) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updated : u));
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      users,
      login,
      signup,
      logout,
      switchDemoUser,
      updateUserProfile,
      isBusiness: currentUser?.role === 'business',
      isInfluencer: currentUser?.role === 'influencer',
      isAdmin: currentUser?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
