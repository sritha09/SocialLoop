import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('sl_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('sl_current_user');
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
    localStorage.setItem('sl_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sl_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('sl_current_user');
    }
  }, [currentUser]);

  const login = (email, password) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      return { success: true, user };
    }
    return { success: false, message: 'Account not found. Please sign up to create your account!' };
  };

  const signup = (userData) => {
    const id = (userData.role === 'business' ? 'b' : 'i') + Date.now();
    const newUser = {
      id,
      followersCount: 0,
      followingCount: 0,
      postsCount: 0,
      likesCount: 0,
      commentsCount: 0,
      savedPostsCount: 0,
      collaborationsCount: 0,
      campaignsCount: 0,
      notificationsCount: 0,
      messagesCount: 0,
      rating: 5.0,
      reviewsCount: 0,
      completionScore: 100,
      isVerified: false,
      avatar: userData.avatar || (userData.role === 'business'
        ? 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=300'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'),
      logo: userData.logo || userData.avatar || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=300',
      coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
      ...userData,
    };
    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    return newUser;
  };

  const updateUserProfile = (updatedData) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updated : u));
  };

  const logout = () => {
    localStorage.removeItem('sl_current_user');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      users,
      login,
      signup,
      logout,
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
