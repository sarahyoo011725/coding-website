'use client';

import { ReactNode, FunctionComponent, useState, useEffect } from 'react';
import {AuthContext, User} from './AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FunctionComponent<AuthProviderProps> = ({
  children
}) => {
  const [user, setUser] = useState<User|null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (credential) => {
      setUser(credential);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};