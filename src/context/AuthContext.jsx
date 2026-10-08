import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageService } from '../services/storageService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default logged in for instant smooth experience

  useEffect(() => {
    const saved = StorageService.getUserProfile();
    setUser(saved);
  }, []);

  const login = (email, password) => {
    const profile = StorageService.getUserProfile();
    const loggedUser = { ...profile, email: email || profile.email };
    setUser(loggedUser);
    setIsAuthenticated(true);
    StorageService.saveUserProfile(loggedUser);
    return true;
  };

  const register = (userData) => {
    const newUser = {
      ...StorageService.getUserProfile(),
      ...userData,
      id: `usr_${Date.now()}`,
      streakDays: 1,
      xpPoints: 100,
      level: 1
    };
    setUser(newUser);
    setIsAuthenticated(true);
    StorageService.saveUserProfile(newUser);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateProfile = (updatedData) => {
    const updated = { ...user, ...updatedData };
    setUser(updated);
    StorageService.saveUserProfile(updated);
  };

  const loadDemoRole = (roleTitle, skillList) => {
    const demo = {
      ...user,
      targetJob: roleTitle,
      skills: skillList || ["Python", "FastAPI", "PostgreSQL", "Docker", "Git"]
    };
    setUser(demo);
    StorageService.saveUserProfile(demo);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      logout,
      updateProfile,
      loadDemoRole
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
