import {createContext, SetStateAction, useContext} from 'react';
import {UserInfo} from 'firebase/auth';
import {Claims} from 'next-firebase-auth-edge/lib/auth/claims';

export interface User extends UserInfo {
  idToken?: string;
  customToken?: string;
  emailVerified: boolean;
  customClaims?: Claims;
}

export interface AuthContextValue {
  user: User | null;
  setUser?: React.Dispatch<SetStateAction<User|null>>;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null
});

export const useAuth = () => useContext(AuthContext);