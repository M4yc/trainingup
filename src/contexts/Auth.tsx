import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Alert } from 'react-native';

import { authService } from 'src/service/authService';

export interface AuthData {
  token: string;
  email: string;
  name: string;
  userType: 'aluno' | 'personal';
}

interface AuthContextData {
  authData?: AuthData;
  signIn: (email: string, password: string) => Promise<AuthData>;
  signOut: () => Promise<void>;
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authData, setAuth] = useState<AuthData>();

  async function signIn(email: string, password: string): Promise<AuthData> {
    try {
      const auth = await authService.signIn(email, password);
      setAuth(auth);
      return auth;
    } catch (error: any) {
      Alert.alert(error?.message || 'Erro ao fazer login', 'Tente novamente');
      throw error;
    }
  }

  async function signOut(): Promise<void> {
    setAuth(undefined);
    return;
  }

  return (
    <AuthContext.Provider value={{ authData, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
}
