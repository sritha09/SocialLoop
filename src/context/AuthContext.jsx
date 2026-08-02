import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('sl_users');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.filter(u => u && !['b1', 'b2', 'b3', 'i1', 'i2', 'i3', 'b4', 'i4'].includes(u.id));
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('sl_current_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && ['b1', 'b2', 'b3', 'i1', 'i2', 'i3', 'b4', 'i4'].includes(parsed.id)) {
          localStorage.removeItem('sl_current_user');
          return null;
        }
        return parsed;
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

  // Clean username helper
  const cleanUsername = (username) => {
    if (!username) return '';
    return username.trim().toLowerCase().replace(/^@/, '');
  };

  // Check username availability in real-time
  const checkUsernameAvailability = (username) => {
    const target = cleanUsername(username);
    if (!target) return true;
    return !users.some(u => cleanUsername(u.username) === target);
  };

  const login = (identifier, password) => {
    if (!identifier) {
      return { success: false, message: 'Please enter your username or email address.' };
    }

    const cleanInput = identifier.trim().toLowerCase();
    const cleanHandle = cleanInput.replace(/^@/, '');

    // 1. Check if identifier is a specific unique username
    const usernameMatch = users.find(u => cleanUsername(u.username) === cleanHandle);
    if (usernameMatch) {
      setCurrentUser(usernameMatch);
      return { success: true, user: usernameMatch };
    }

    // 2. Check if identifier is an email address
    const matchingAccounts = users.filter(u => u.email?.toLowerCase() === cleanInput);

    if (matchingAccounts.length > 1) {
      return { 
        requiresAccountSelection: true, 
        accounts: matchingAccounts,
        message: 'Multiple SocialLoop accounts found for this email address.' 
      };
    }

    if (matchingAccounts.length === 1) {
      setCurrentUser(matchingAccounts[0]);
      return { success: true, user: matchingAccounts[0] };
    }

    return { success: false, message: 'Account not found. Please sign up to create your account!' };
  };

  const selectAccount = (account) => {
    if (!account) return;
    setCurrentUser(account);
    return { success: true, user: account };
  };

  const signup = (userData) => {
    const formattedUsername = userData.username 
      ? (userData.username.startsWith('@') ? userData.username : `@${userData.username.trim()}`)
      : `@user_${Date.now().toString().slice(-4)}`;

    const targetHandle = cleanUsername(formattedUsername);

    // Verify username availability globally
    if (users.some(u => cleanUsername(u.username) === targetHandle)) {
      return { 
        success: false, 
        message: 'This username is already taken. Please choose another one.' 
      };
    }

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
      username: formattedUsername,
      avatar: userData.avatar || (userData.role === 'business'
        ? 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=300'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'),
      logo: userData.logo || userData.avatar || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=300',
      coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
      ...userData,
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
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
      selectAccount,
      signup,
      logout,
      checkUsernameAvailability,
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
