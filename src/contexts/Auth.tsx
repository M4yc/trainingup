import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect
} from 'react';
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
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

// Adicione este tipo
type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const AUTH_STORAGE_KEY = '@authData';

  const [authData, setAuth] = useState<AuthData>();

  useEffect(() => {
    async function loadAuthData() {
      const storedAuth = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (storedAuth) {
        setAuth(JSON.parse(storedAuth));
      }
    }

    loadAuthData();
  }, []);

  async function signIn(email: string, password: string): Promise<AuthData> {
    try {
      const auth = await authService.signIn(email, password);
      setAuth(auth);
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));

      return auth;
    } catch (error) {
      Alert.alert(error.message, 'Tente novamente');
    }
  }

  async function signOut(): Promise<void> {
    setAuth(undefined);
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
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
  return context;
}
