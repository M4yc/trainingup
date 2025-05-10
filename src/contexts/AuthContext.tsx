import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  email: string;
  name?: string;
};

type AuthContextData = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  
};

// Adicione este tipo
type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Verifica se o usuário está logado ao iniciar o app
  useEffect(() => {
    async function loadStorageData() {
      const storedUser = await AsyncStorage.getItem('@Auth:user');
      if (storedUser) setUser(JSON.parse(storedUser));
      setLoading(false);
    }
    loadStorageData();
  }, []);

  async function signIn(email: string, password: string) {
    // Validação adicional no contexto (segunda camada de segurança)
    if (!email || !password) {
      throw new Error('Credenciais não fornecidas');
    }

    // Simulação: substitua por sua API real
    if (email !== 'maycon@teste.com' || password !== '123456') {
      throw new Error('Credenciais inválidas');
    }

    const mockUser = { email };
    await AsyncStorage.setItem('@Auth:user', JSON.stringify(mockUser));
    setUser(mockUser);
  }

  async function signOut() {
    await AsyncStorage.removeItem('@Auth:user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);